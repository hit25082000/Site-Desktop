/**
 * Kie AI API Service for image generation
 * Base URL: https://api.kie.ai
 */

const BASE_URL = 'https://api.kie.ai';
const CREATE_TASK_TIMEOUT_MS = 30000;
const STATUS_TIMEOUT_MS = 15000;
export const KIE_PRIMARY_IMAGE_MODEL = 'gpt-image-2-image-to-image';
export const KIE_NANO_BANANA_PRO_MODEL = 'nano-banana-pro';

const IMAGE_TO_IMAGE_MODELS = {
  [KIE_PRIMARY_IMAGE_MODEL]: {
    imageInputKey: 'input_urls',
    supportsResolution: true
  },
  [KIE_NANO_BANANA_PRO_MODEL]: {
    imageInputKey: 'image_input',
    supportsResolution: true,
    outputFormat: 'png'
  },
  'nano-banana-2': {
    imageInputKey: 'image_input',
    supportsResolution: true,
    outputFormat: 'png'
  }
};

const getHeaders = () => {
  const apiKey = import.meta.env.VITE_KIE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('Chave de API VITE_KIE_AI_API_KEY não encontrada nas variáveis de ambiente.');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
};

const fetchWithTimeout = async (url, options = {}, timeoutMs = 20000) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
};

const normalizeInputUrls = (inputUrls) => (
  (Array.isArray(inputUrls) ? inputUrls : [inputUrls])
    .filter((url) => typeof url === 'string' && url.trim())
);

const resolveImageToImageModel = (model) => (
  IMAGE_TO_IMAGE_MODELS[model] ? model : KIE_NANO_BANANA_PRO_MODEL
);

export const getKieGenerationAttemptModels = (requestedModel = KIE_PRIMARY_IMAGE_MODEL) => {
  const primaryModel = resolveImageToImageModel(requestedModel || KIE_PRIMARY_IMAGE_MODEL);
  const models = [primaryModel];

  if (primaryModel === KIE_PRIMARY_IMAGE_MODEL) {
    models.push(KIE_NANO_BANANA_PRO_MODEL);
  }

  return Array.from(new Set(models));
};

export const buildKieGenerationPayload = (prompt, inputUrls, options = {}) => {
  const model = resolveImageToImageModel(options.model || KIE_PRIMARY_IMAGE_MODEL);
  const modelConfig = IMAGE_TO_IMAGE_MODELS[model];
  const urlsArray = normalizeInputUrls(inputUrls);

  if (urlsArray.length === 0) {
    throw new Error('Nenhuma imagem de referência foi enviada para a geração.');
  }

  const input = {
    prompt,
    [modelConfig.imageInputKey]: urlsArray,
    aspect_ratio: options.aspectRatio || '3:4'
  };

  if (options.resolution && modelConfig.supportsResolution) {
    input.resolution = options.resolution;
  }

  if (modelConfig.outputFormat) {
    input.output_format = modelConfig.outputFormat;
  }

  return { model, input };
};

/**
 * Initiates an image-to-image generation task on Kie AI using GPT Image 2 first.
 * @param {string} prompt - Prompt describing the target image style/pose (in English)
 * @param {string|string[]} inputUrls - Public URL or array of public URLs of reference photos
 * @param {{ model?: string, aspectRatio?: string, resolution?: string, onModelUsed?: (model: string) => void }} [options]
 * @returns {Promise<string>} - The taskId returned by the API
 */
export async function createGenerationTask(prompt, inputUrls, options = {}) {
  const headers = getHeaders();
  const requestedModel = options.model || KIE_PRIMARY_IMAGE_MODEL;
  const attemptModels = getKieGenerationAttemptModels(requestedModel);
  let lastError = null;

  for (const model of attemptModels) {
    try {
      const payload = buildKieGenerationPayload(prompt, inputUrls, { ...options, model });
      const response = await fetchWithTimeout(`${BASE_URL}/api/v1/jobs/createTask`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      }, CREATE_TASK_TIMEOUT_MS);

      const responseText = await response.text();
      const json = responseText ? JSON.parse(responseText) : {};

      if (!response.ok || json.code !== 200) {
        throw new Error(json.msg || `Erro da API Kie AI (Código: ${json.code || response.status})`);
      }

      if (!json.data?.taskId) {
        throw new Error('TaskId não retornado na resposta do Kie AI.');
      }

      if (typeof options.onModelUsed === 'function') {
        options.onModelUsed(model);
      }

      return json.data.taskId;
    } catch (error) {
      lastError = error;
      const isLastAttempt = model === attemptModels[attemptModels.length - 1];

      if (!isLastAttempt) {
        console.warn(`Falha no modelo ${model}; tentando fallback ${attemptModels[attemptModels.indexOf(model) + 1]}:`, error);
      }
    }
  }

  console.error('Erro ao criar tarefa no Kie AI:', lastError);
  throw lastError;
}

/**
 * Checks the status of a task by taskId.
 * @param {string} taskId - The taskId to query
 * @returns {Promise<{ status: string, url: string|null, error: string|null }>}
 */
export async function getTaskStatus(taskId) {
  try {
    const headers = getHeaders();
    const response = await fetchWithTimeout(`${BASE_URL}/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': headers.Authorization
      }
    }, STATUS_TIMEOUT_MS);

    const json = await response.json();

    if (json.code !== 200) {
      throw new Error(json.msg || `Erro ao consultar status (Código: ${json.code})`);
    }

    const taskData = json.data;
    const status = taskData?.state || taskData?.status; // e.g., 'waiting', 'queuing', 'generating', 'success', 'fail'
    let url = null;
    let error = null;

    if (status === 'success') {
      url = getImageUrlFromRecordInfo(taskData);
      if (!url) {
        error = 'Imagem gerada com sucesso, mas a URL não pôde ser encontrada na resposta.';
      }
    } else if (status === 'fail' || status === 'failed') {
      error = taskData?.failMsg || taskData?.error || 'A tarefa de geração falhou.';
    }

    return {
      status,
      url,
      error
    };
  } catch (error) {
    console.error(`Erro ao obter status da tarefa ${taskId}:`, error);
    return {
      status: 'error',
      url: null,
      error: error.message
    };
  }
}

/**
 * Helper to robustly extract the generated image URL from the recordInfo response data.
 * @param {object} recordData - The data field from the recordInfo response
 * @returns {string|null} - The image URL or null if not found
 */
export function getImageUrlFromRecordInfo(recordData) {
  if (!recordData) return null;

  // 0. Check data.resultJson which is a JSON string containing resultUrls array
  if (recordData.resultJson) {
    try {
      const parsed = typeof recordData.resultJson === 'string'
        ? JSON.parse(recordData.resultJson)
        : recordData.resultJson;
      if (parsed?.resultUrls?.[0]) return parsed.resultUrls[0];
      if (parsed?.urls?.[0]) return parsed.urls[0];
      if (parsed?.images?.[0]?.url) return parsed.images[0].url;
      if (parsed?.images?.[0]) return parsed.images[0];
    } catch (e) {
      console.warn('Failed to parse resultJson in getImageUrlFromRecordInfo:', e);
    }
  }

  // 1. Check data.info.resultImageUrl
  if (recordData.info?.resultImageUrl) {
    return recordData.info.resultImageUrl;
  }

  // 2. Check data.response.images
  if (recordData.response?.images?.[0]?.url) {
    return recordData.response.images[0].url;
  }

  // 3. Check data.images
  if (recordData.images?.[0]?.url) {
    return recordData.images[0].url;
  }
  if (recordData.images?.[0]) {
    return recordData.images[0];
  }

  // 4. Check data.url
  if (recordData.url) {
    return recordData.url;
  }

  // 5. Check data.video_url (just in case)
  if (recordData.video_url) {
    return recordData.video_url;
  }

  return null;
}
