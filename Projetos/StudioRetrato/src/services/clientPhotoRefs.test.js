import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLIENT_PHOTO_ROLE_STYLE_SHEET,
  getClientGenerationInputUrls,
  getClientIdentitySourceUrls,
  hasPendingClientStyleSheet,
  hasUsableClientStyleSheet,
  parseClientPhotoRefs,
  serializeClientPhotoRefs
} from './clientPhotoRefs.js';

test('preserves pending client style sheet refs without a URL', () => {
  const serialized = serializeClientPhotoRefs([
    { url: 'https://example.com/face.jpg', role: 'face' },
    {
      role: CLIENT_PHOTO_ROLE_STYLE_SHEET,
      taskId: 'task_123',
      status: 'generating',
      inputUrls: ['https://example.com/face.jpg']
    }
  ]);

  const refs = parseClientPhotoRefs(serialized);

  assert.equal(refs.length, 2);
  assert.equal(refs[1].role, CLIENT_PHOTO_ROLE_STYLE_SHEET);
  assert.equal(refs[1].taskId, 'task_123');
  assert.equal(hasPendingClientStyleSheet(refs), true);
});

test('prefers ready style sheet plus body support for generation input', () => {
  const refs = [
    { url: 'https://example.com/face.jpg', role: 'face' },
    { url: 'https://example.com/body.jpg', role: 'body' },
    { url: 'https://example.com/style-sheet.jpg', role: CLIENT_PHOTO_ROLE_STYLE_SHEET, status: 'success' }
  ];

  assert.deepEqual(getClientGenerationInputUrls(refs), [
    'https://example.com/style-sheet.jpg',
    'https://example.com/body.jpg'
  ]);
  assert.deepEqual(getClientIdentitySourceUrls(refs), [
    'https://example.com/face.jpg',
    'https://example.com/body.jpg'
  ]);
  assert.equal(hasUsableClientStyleSheet(refs), true);
});
