import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KIE_NANO_BANANA_PRO_MODEL,
  KIE_PRIMARY_IMAGE_MODEL,
  buildKieGenerationPayload,
  getKieGenerationAttemptModels
} from './kieAi.js';

const referenceUrls = [
  'https://example.com/client-face.jpg',
  'https://example.com/client-body.jpg',
  'https://example.com/style-reference.jpg'
];

test('builds GPT Image 2 image-to-image payload with reference URLs', () => {
  const payload = buildKieGenerationPayload('Generate portrait', referenceUrls, {
    aspectRatio: '3:4',
    resolution: '1K'
  });

  assert.equal(payload.model, KIE_PRIMARY_IMAGE_MODEL);
  assert.deepEqual(payload.input.input_urls, referenceUrls);
  assert.equal(payload.input.aspect_ratio, '3:4');
  assert.equal(payload.input.resolution, '1K');
  assert.equal(payload.input.image_urls, undefined);
  assert.equal(payload.input.image_input, undefined);
});

test('uses Nano Banana Pro as the primary fallback', () => {
  assert.deepEqual(getKieGenerationAttemptModels(KIE_PRIMARY_IMAGE_MODEL), [
    KIE_PRIMARY_IMAGE_MODEL,
    KIE_NANO_BANANA_PRO_MODEL
  ]);
});

test('falls unsupported image models back to Nano Banana Pro image_input', () => {
  const payload = buildKieGenerationPayload('Generate portrait', referenceUrls, {
    model: 'text-only-model',
    aspectRatio: '3:4',
    resolution: '1K'
  });

  assert.equal(payload.model, KIE_NANO_BANANA_PRO_MODEL);
  assert.deepEqual(payload.input.image_input, referenceUrls);
  assert.equal(payload.input.output_format, 'png');
});

test('requires at least one reference image URL', () => {
  assert.throws(
    () => buildKieGenerationPayload('Generate portrait', [], {}),
    /Nenhuma imagem de referência/
  );
});
