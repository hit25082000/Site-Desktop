import {
  CLIENT_STYLE_SHEET_ASPECT_RATIO,
  CLIENT_STYLE_SHEET_MODEL,
  CLIENT_STYLE_SHEET_RESOLUTION,
  buildClientStyleSheetPrompt
} from './bookPrompt.js';
import {
  getClientIdentitySourceUrls,
  hasPendingClientStyleSheet,
  hasUsableClientStyleSheet,
  mergeClientStyleSheetRef
} from './clientPhotoRefs.js';
import * as kieAi from './kieAi.js';

export const queueClientStyleSheetTask = async (clientPhotoRefs = [], { force = false } = {}) => {
  const inputUrls = getClientIdentitySourceUrls(clientPhotoRefs);
  if (inputUrls.length === 0) {
    return { refs: clientPhotoRefs, queued: false };
  }

  if (!force && (hasUsableClientStyleSheet(clientPhotoRefs) || hasPendingClientStyleSheet(clientPhotoRefs))) {
    return { refs: clientPhotoRefs, queued: false };
  }

  const prompt = buildClientStyleSheetPrompt();
  const taskId = await kieAi.createGenerationTask(prompt, inputUrls, {
    model: CLIENT_STYLE_SHEET_MODEL,
    aspectRatio: CLIENT_STYLE_SHEET_ASPECT_RATIO,
    resolution: CLIENT_STYLE_SHEET_RESOLUTION
  });

  return {
    refs: mergeClientStyleSheetRef(clientPhotoRefs, {
      taskId,
      status: 'generating',
      source: 'kie-ai-style-sheet',
      inputUrls,
      prompt,
      createdAt: new Date().toISOString()
    }),
    queued: true,
    taskId
  };
};
