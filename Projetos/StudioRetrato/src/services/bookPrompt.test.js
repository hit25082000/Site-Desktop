import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BOOK_BATCH_ASPECT_RATIO,
  BOOK_BATCH_RESOLUTION,
  CLIENT_STYLE_SHEET_MODEL,
  MAX_BOOK_BATCH_PHOTOS,
  buildClientStyleSheetPrompt,
  buildBookBatchPrompt,
  chunkBookReferences,
  getBookBatchReferences
} from './bookPrompt.js';

const references = Array.from({ length: 14 }, (_, index) => ({
  id: `ref_${index + 1}`,
  name: `Pose ${index + 1}`,
  category: 'Editorial',
  url: `https://example.com/ref-${index + 1}.jpg`,
  prompt: `Portrait pose direction ${index + 1}`
}));

test('caps batch references at twelve', () => {
  const selected = getBookBatchReferences(references);

  assert.equal(selected.length, MAX_BOOK_BATCH_PHOTOS);
  assert.equal(selected[0].id, 'ref_1');
  assert.equal(selected[11].id, 'ref_12');
});

test('chunks references into individual photo tasks', () => {
  const chunks = chunkBookReferences(references, 4, 5);

  assert.deepEqual(chunks.map((chunk) => chunk.map((ref) => ref.id)), [
    ['ref_1'],
    ['ref_2'],
    ['ref_3'],
    ['ref_4'],
    ['ref_5'],
    ['ref_6'],
    ['ref_7'],
    ['ref_8'],
    ['ref_9'],
    ['ref_10'],
    ['ref_11'],
    ['ref_12']
  ]);
});

test('builds one vertical 1K portrait prompt without panels', () => {
  const prompt = buildBookBatchPrompt({
    references: references.slice(0, 4),
    promptDetails: 'Aniversario de 33 anos',
    clientDescription: 'Oval face, warm brown eyes, highlighted long hair',
    batchIndex: 0,
    batchTotal: 3
  });

  assert.equal(BOOK_BATCH_ASPECT_RATIO, '3:4');
  assert.equal(BOOK_BATCH_RESOLUTION, '1K');
  assert.match(prompt, new RegExp(`one single vertical ${BOOK_BATCH_ASPECT_RATIO.replace(':', '\\:')} portrait image at ${BOOK_BATCH_RESOLUTION}`));
  assert.match(prompt, /exactly one finished photo only/i);
  assert.doesNotMatch(prompt, /Panel 2/);
  assert.doesNotMatch(prompt, /stacked from top to bottom/i);
});

test('builds client style sheet prompt for frontal and 45 degree identity references', () => {
  const prompt = buildClientStyleSheetPrompt();

  assert.equal(CLIENT_STYLE_SHEET_MODEL, 'gpt-image-2-image-to-image');
  assert.match(prompt, /4 quadros principais/i);
  assert.match(prompt, /rosto frontal/i);
  assert.match(prompt, /45 graus/i);
  assert.match(prompt, /não invente um corpo de modelo/i);
});
