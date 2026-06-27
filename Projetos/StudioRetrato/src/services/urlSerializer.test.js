import test from 'node:test';
import assert from 'node:assert/strict';
import { decodeBookData, encodeBookData } from './urlSerializer.js';

test('round trips package pricing and prompt details', () => {
  const book = {
    id: 'book_1',
    clientId: 'client_1',
    clientName: 'Cliente',
    title: 'Book Teste',
    pricePerPhoto: null,
    packagePrice: 90,
    packagePhotos: 3,
    extraPhotoPrice: 20,
    paymentStatus: 'pending',
    selectedPhotoIds: ['img_1'],
    promptDetails: 'Aniversario de 33 anos',
    referencesData: [{ id: 'ref_1', name: 'Pose', url: 'ref.jpg', prompt: 'Prompt' }],
    photos: [{ id: 'img_1', url: 'img.jpg', variationType: 'Editorial' }]
  };

  const encoded = encodeBookData(book);
  const decoded = decodeBookData(encoded);

  assert.equal(decoded.packagePrice, 90);
  assert.equal(decoded.packagePhotos, 3);
  assert.equal(decoded.extraPhotoPrice, 20);
  assert.equal(decoded.promptDetails, 'Aniversario de 33 anos');
  assert.deepEqual(decoded.referencesData, book.referencesData);
});

test('decodes malformed payloads as null', () => {
  const originalError = console.error;
  console.error = () => {};
  try {
    assert.equal(decodeBookData('not-valid'), null);
  } finally {
    console.error = originalError;
  }
});
