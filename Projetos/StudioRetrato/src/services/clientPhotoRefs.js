export const CLIENT_PHOTO_ROLE_FACE = 'face';
export const CLIENT_PHOTO_ROLE_BODY = 'body';
export const CLIENT_PHOTO_ROLE_STYLE_SHEET = 'styleSheet';

export const normalizeClientPhotoRole = (role) => {
  if (role === CLIENT_PHOTO_ROLE_BODY) return CLIENT_PHOTO_ROLE_BODY;
  if (role === CLIENT_PHOTO_ROLE_STYLE_SHEET || role === 'style_sheet' || role === 'stylesheet') {
    return CLIENT_PHOTO_ROLE_STYLE_SHEET;
  }
  return CLIENT_PHOTO_ROLE_FACE;
};

const compactRef = (ref) => Object.fromEntries(
  Object.entries(ref).filter(([, value]) => value !== undefined && value !== null && value !== '')
);

export const normalizeClientPhotoRef = (item) => {
  if (typeof item === 'string') {
    const url = item.trim();
    return url ? { url, role: CLIENT_PHOTO_ROLE_FACE } : null;
  }

  if (!item || typeof item !== 'object') return null;

  const ref = compactRef({
    url: typeof item.url === 'string' ? item.url.trim() : '',
    role: normalizeClientPhotoRole(item.role),
    status: item.status,
    taskId: item.taskId,
    source: item.source,
    createdAt: item.createdAt,
    completedAt: item.completedAt,
    error: item.error,
    prompt: item.prompt,
    inputUrls: Array.isArray(item.inputUrls) ? item.inputUrls.filter(Boolean) : undefined
  });

  if (!ref.url && !ref.taskId) return null;
  return ref;
};

export const parseClientPhotoRefs = (photoUrlField) => {
  if (!photoUrlField) return [];
  try {
    const trimmed = typeof photoUrlField === 'string' ? photoUrlField.trim() : '';
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      return JSON.parse(trimmed)
        .map(normalizeClientPhotoRef)
        .filter(Boolean);
    }
  } catch (e) {
    console.error('Failed to parse photo_url field as references:', e);
  }
  return typeof photoUrlField === 'string' ? [{ url: photoUrlField, role: CLIENT_PHOTO_ROLE_FACE }] : [];
};

export const serializeClientPhotoRefs = (refs = []) => {
  const normalized = refs.map(normalizeClientPhotoRef).filter(Boolean);
  return normalized.length > 0 ? JSON.stringify(normalized) : null;
};

export const parsePhotos = (photoUrlField) =>
  parseClientPhotoRefs(photoUrlField).map((item) => item.url).filter(Boolean);

export const getClientPhotoUrlsByRole = (refs = [], role) => {
  const normalizedRole = normalizeClientPhotoRole(role);
  return refs
    .map(normalizeClientPhotoRef)
    .filter((item) => item?.role === normalizedRole && item.url && item.status !== 'failed')
    .map((item) => item.url);
};

export const getClientIdentitySourceUrls = (refs = []) => refs
  .map(normalizeClientPhotoRef)
  .filter((item) => item?.url && item.role !== CLIENT_PHOTO_ROLE_STYLE_SHEET)
  .map((item) => item.url);

export const getReadyClientStyleSheetUrls = (refs = []) => getClientPhotoUrlsByRole(refs, CLIENT_PHOTO_ROLE_STYLE_SHEET);

export const hasUsableClientStyleSheet = (refs = []) =>
  refs.some((item) => {
    const ref = normalizeClientPhotoRef(item);
    return ref?.role === CLIENT_PHOTO_ROLE_STYLE_SHEET && ref.url && ref.status !== 'failed';
  });

export const hasPendingClientStyleSheet = (refs = []) =>
  refs.some((item) => {
    const ref = normalizeClientPhotoRef(item);
    return ref?.role === CLIENT_PHOTO_ROLE_STYLE_SHEET && ref.taskId && ref.status === 'generating';
  });

export const getClientGenerationInputUrls = (refs = []) => {
  const styleSheetUrls = getReadyClientStyleSheetUrls(refs);
  const bodyUrls = getClientPhotoUrlsByRole(refs, CLIENT_PHOTO_ROLE_BODY);
  const faceUrls = getClientPhotoUrlsByRole(refs, CLIENT_PHOTO_ROLE_FACE);
  const urls = styleSheetUrls.length > 0
    ? [...styleSheetUrls, ...bodyUrls]
    : [...faceUrls, ...bodyUrls];

  return Array.from(new Set(urls.filter(Boolean)));
};

export const mergeClientStyleSheetRef = (refs = [], styleSheetRef) => {
  const normalizedStyleSheet = normalizeClientPhotoRef({
    ...styleSheetRef,
    role: CLIENT_PHOTO_ROLE_STYLE_SHEET
  });

  if (!normalizedStyleSheet) return refs.map(normalizeClientPhotoRef).filter(Boolean);

  return [
    ...refs
      .map(normalizeClientPhotoRef)
      .filter((item) => item && item.role !== CLIENT_PHOTO_ROLE_STYLE_SHEET),
    normalizedStyleSheet
  ];
};
