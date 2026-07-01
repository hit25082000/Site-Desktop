import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyBookPaymentAction,
  applyPhotoReplacement,
  normalizeBookPricing,
  reconcileSelectedPhotoIds
} from './bookAdminActions.js';

const baseBook = {
  paymentStatus: 'pending',
  packagePrice: 50,
  packagePhotos: 2,
  extraPhotoPrice: 10,
  selectedPhotoIds: ['a', 'b', 'c'],
  photos: [
    { id: 'a', url: 'a.jpg' },
    { id: 'b', url: 'b.jpg' },
    { id: 'c', url: 'c.jpg' }
  ]
};

test('marks selected photos as paid', () => {
  const result = applyBookPaymentAction(baseBook, 'mark_selected_paid');

  assert.equal(result.error, undefined);
  assert.equal(result.book.paymentStatus, 'paid');
  assert.deepEqual(
    result.book.photos.map((photo) => photo.paymentStatus),
    ['paid', 'paid', 'paid']
  );
});

test('marks only package photos as paid and leaves extras pending', () => {
  const result = applyBookPaymentAction(baseBook, 'mark_package_paid');

  assert.equal(result.error, undefined);
  assert.equal(result.book.paymentStatus, 'partial_paid');
  assert.deepEqual(
    result.book.photos.map((photo) => photo.paymentStatus),
    ['paid', 'paid', 'pending']
  );
});

test('marks package batch photos by contained photo quantity', () => {
  const result = applyBookPaymentAction({
    paymentStatus: 'pending',
    packagePrice: 100,
    packagePhotos: 5,
    extraPhotoPrice: 20,
    selectedPhotoIds: ['batch_1', 'batch_2', 'batch_3'],
    photos: [
      { id: 'batch_1', url: 'batch-1.jpg', photoCount: 4 },
      { id: 'batch_2', url: 'batch-2.jpg', photoCount: 1 },
      { id: 'batch_3', url: 'batch-3.jpg', photoCount: 4 }
    ]
  }, 'mark_package_paid');

  assert.equal(result.error, undefined);
  assert.equal(result.book.paymentStatus, 'partial_paid');
  assert.deepEqual(
    result.book.photos.map((photo) => photo.paymentStatus),
    ['paid', 'paid', 'pending']
  );
});

test('clears paid state without clearing selected photos', () => {
  const paidBook = {
    ...baseBook,
    paymentStatus: 'paid',
    photos: baseBook.photos.map((photo) => ({ ...photo, paymentStatus: 'paid' }))
  };

  const result = applyBookPaymentAction(paidBook, 'clear_paid');

  assert.equal(result.book.paymentStatus, 'pending');
  assert.deepEqual(result.book.selectedPhotoIds, ['a', 'b', 'c']);
  assert.deepEqual(
    result.book.photos.map((photo) => photo.paymentStatus),
    ['pending', 'pending', 'pending']
  );
});

test('normalizes package pricing', () => {
  const result = normalizeBookPricing({
    packagePrice: '80',
    packagePhotos: '4',
    extraPhotoPrice: '15',
    pricePerPhoto: ''
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.dbPayload, {
    price_per_photo: null,
    package_price: 80,
    package_photos: 4,
    extra_photo_price: 15
  });
});

test('normalizes per-photo pricing when package fields are empty', () => {
  const result = normalizeBookPricing({
    packagePrice: '',
    packagePhotos: '',
    extraPhotoPrice: '',
    pricePerPhoto: '30'
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.pricing, {
    pricePerPhoto: 30,
    packagePrice: null,
    packagePhotos: null,
    extraPhotoPrice: null
  });
});

test('rejects incomplete package pricing', () => {
  const result = normalizeBookPricing({
    packagePrice: '80',
    packagePhotos: '',
    extraPhotoPrice: '10',
    pricePerPhoto: ''
  });

  assert.equal(result.valid, false);
});

test('normalizes prepaid package pricing (packagePrice = 0)', () => {
  const result = normalizeBookPricing({
    packagePrice: 0,
    packagePhotos: '5',
    extraPhotoPrice: '10',
    pricePerPhoto: ''
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.dbPayload, {
    price_per_photo: null,
    package_price: 0,
    package_photos: 5,
    extra_photo_price: 10
  });
});

test('rejects prepaid package pricing when extra photo price is zero or blank', () => {
  const zeroResult = normalizeBookPricing({
    packagePrice: 0,
    packagePhotos: '5',
    extraPhotoPrice: '0',
    pricePerPhoto: ''
  });

  const blankResult = normalizeBookPricing({
    packagePrice: 0,
    packagePhotos: '5',
    extraPhotoPrice: '',
    pricePerPhoto: ''
  });

  assert.equal(zeroResult.valid, false);
  assert.equal(blankResult.valid, false);
});

test('reconciles selected ids after replacing photos', () => {
  assert.deepEqual(
    reconcileSelectedPhotoIds(['a', 'b', 'missing'], [{ id: 'b' }, { id: 'c' }]),
    ['b']
  );
});

test('replaces photos and removes stale selected ids', () => {
  const result = applyPhotoReplacement({
    currentPhotos: [{ id: 'old' }],
    nextPhotos: [{ id: 'new' }],
    selectedPhotoIds: ['old', 'new'],
    mode: 'replace'
  });

  assert.deepEqual(result.photos, [{ id: 'new' }]);
  assert.deepEqual(result.selectedPhotoIds, ['new']);
});
