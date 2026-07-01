import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyPrepaidPackageSections,
  applyConfirmedPaymentToBook,
  calculateBookPaymentQuote,
  calculatePerPhotoSelectionPrice
} from './bookPayment.js';

const photos = [
  { id: 'a', url: 'a.jpg' },
  { id: 'b', url: 'b.jpg' },
  { id: 'c', url: 'c.jpg' },
  { id: 'd', url: 'd.jpg' }
];

test('calculates progressive per-photo discounts for the first payment', () => {
  assert.equal(calculatePerPhotoSelectionPrice(30, 4), 120);
  assert.equal(calculatePerPhotoSelectionPrice(30, 5), 120);
  assert.equal(calculatePerPhotoSelectionPrice(30, 7), 180);
  assert.equal(calculatePerPhotoSelectionPrice(30, 10), 210);
  assert.equal(calculatePerPhotoSelectionPrice(30, 12), 270);
});

test('quotes package payment first and keeps extras for a later payment', () => {
  const quote = calculateBookPaymentQuote({
    photos,
    packagePrice: 80,
    packagePhotos: 2,
    extraPhotoPrice: 15,
    paymentStatus: 'pending'
  }, ['a', 'b', 'c']);

  assert.equal(quote.amountDueNow, 80);
  assert.equal(quote.totalSelectionPrice, 95);
  assert.equal(quote.paymentStage, 'package');
  assert.deepEqual(quote.payablePhotoIds, ['a', 'b']);
  assert.equal(quote.pendingExtraCount, 1);
});

test('counts generated batch items by contained photo quantity', () => {
  const quote = calculateBookPaymentQuote({
    photos: [
      { id: 'batch_1', url: 'batch-1.jpg', photoCount: 4 },
      { id: 'batch_2', url: 'batch-2.jpg', photoCount: 1 },
      { id: 'batch_3', url: 'batch-3.jpg', photoCount: 4 }
    ],
    packagePrice: 100,
    packagePhotos: 5,
    extraPhotoPrice: 20,
    paymentStatus: 'pending'
  }, ['batch_1', 'batch_2', 'batch_3']);

  assert.equal(quote.selectedCount, 9);
  assert.equal(quote.totalSelectionPrice, 180);
  assert.deepEqual(quote.packageSelectedIds, ['batch_1', 'batch_2']);
  assert.deepEqual(quote.extraSelectedIds, ['batch_3']);
  assert.equal(quote.pendingExtraCount, 4);
});

test('marks prepaid package batches as saved and leaves extras additional', () => {
  const result = applyPrepaidPackageSections([
    { id: 'batch_1', photoCount: 4 },
    { id: 'batch_2', photoCount: 1 },
    { id: 'batch_3', photoCount: 4 }
  ], 5, true);

  assert.deepEqual(
    result.map((photo) => [photo.id, photo.section, photo.paymentStatus]),
    [
      ['batch_1', 'saved', 'paid'],
      ['batch_2', 'saved', 'paid'],
      ['batch_3', 'additional', 'pending']
    ]
  );
});

test('quotes zero totals when no photos are selected', () => {
  const quote = calculateBookPaymentQuote({
    photos,
    packagePrice: 80,
    packagePhotos: 2,
    extraPhotoPrice: 15,
    paymentStatus: 'pending'
  }, []);

  assert.equal(quote.amountDueNow, 0);
  assert.equal(quote.totalSelectionPrice, 0);
  assert.equal(quote.requiresPayment, false);
  assert.equal(quote.selectionOnly, false);
});

test('quotes only pending extras after the package is confirmed', () => {
  const quote = calculateBookPaymentQuote({
    photos: photos.map((photo) => photo.id === 'a' || photo.id === 'b' ? { ...photo, paymentStatus: 'paid' } : photo),
    packagePrice: 80,
    packagePhotos: 2,
    extraPhotoPrice: 15,
    paymentStatus: 'partial_paid'
  }, ['a', 'b', 'c', 'd']);

  assert.equal(quote.amountDueNow, 30);
  assert.equal(quote.paymentStage, 'extras');
  assert.deepEqual(quote.payablePhotoIds, ['c', 'd']);
});

test('does not unlock prepaid package photos before confirmation exists', () => {
  const quote = calculateBookPaymentQuote({
    photos,
    packagePrice: 0,
    packagePhotos: 2,
    extraPhotoPrice: 15,
    paymentStatus: 'pending'
  }, ['a']);

  assert.equal(quote.amountDueNow, 0);
  assert.equal(quote.selectionOnly, true);
  assert.equal(quote.paymentStage, 'awaiting_package_confirmation');
  assert.deepEqual(quote.payablePhotoIds, []);
});

test('unlocks covered package slots only after a previous confirmation', () => {
  const quote = calculateBookPaymentQuote({
    photos: [{ ...photos[0], paymentStatus: 'paid' }, photos[1]],
    packagePrice: 80,
    packagePhotos: 2,
    extraPhotoPrice: 15,
    paymentStatus: 'partial_paid'
  }, ['a', 'b']);

  assert.equal(quote.amountDueNow, 0);
  assert.equal(quote.canFinalizeWithoutPayment, true);
  assert.deepEqual(quote.payablePhotoIds, ['b']);
});

test('applies confirmed payment only to payable photos', () => {
  const result = applyConfirmedPaymentToBook({
    photos,
    paymentStatus: 'pending'
  }, ['a', 'b', 'c'], ['a', 'b']);

  assert.equal(result.paymentStatus, 'partial_paid');
  assert.deepEqual(
    result.photos.map((photo) => photo.paymentStatus || 'pending'),
    ['paid', 'paid', 'pending', 'pending']
  );
  assert.deepEqual(result.selectedPhotoIds, ['a', 'b', 'c']);
});
