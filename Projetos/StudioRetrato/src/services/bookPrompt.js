export const DEFAULT_BOOK_PROMPT_DETAILS_PLACEHOLDER = 'Aniversario de 33 anos';
export const BOOK_BATCH_SIZE = 1;
export const MAX_BOOK_BATCH_PHOTOS = 12;
export const BOOK_BATCH_ASPECT_RATIO = '3:4';
export const BOOK_BATCH_RESOLUTION = '1K';
export const CLIENT_STYLE_SHEET_MODEL = 'gpt-image-2-image-to-image';
export const CLIENT_STYLE_SHEET_ASPECT_RATIO = '3:4';
export const CLIENT_STYLE_SHEET_RESOLUTION = '1K';
export const MAX_BOOK_PANORAMA_IMAGES = MAX_BOOK_BATCH_PHOTOS;
export const BOOK_PANORAMA_ASPECT_RATIO = BOOK_BATCH_ASPECT_RATIO;

export const CLIENT_STYLE_SHEET_PROMPT = `Crie um style sheet fotográfico realista da pessoa das imagens de referência, usando apenas os ângulos disponíveis: frontal e 45 graus.

Objetivo principal:
preservar a identidade real do cliente com máxima fidelidade de rosto, corpo, idade aparente, proporções e presença visual.

Use as imagens enviadas como referência prioritária de identidade.
Ignore baixa qualidade, ruído, desfoque, compressão, iluminação ruim, manchas, distorções de câmera e defeitos da foto original.

Preserve obrigatoriamente:

* formato real do rosto;
* estrutura óssea facial;
* olhos;
* nariz;
* boca;
* sobrancelhas;
* testa;
* queixo;
* maxilar;
* cabelo;
* tom de pele;
* idade aparente;
* proporção do pescoço;
* estrutura corporal;
* largura dos ombros;
* volume corporal;
* postura natural;
* aparência geral da pessoa.

Composição do style sheet:
crie uma folha limpa, organizada e fotográfica com 4 quadros principais:

1. rosto frontal, olhando para a câmera;
2. rosto em 45 graus, usando o mesmo lado mais visível nas referências;
3. meio corpo frontal, postura natural;
4. meio corpo em 45 graus, coerente com o mesmo ângulo facial usado no rosto.

Se houver referência de corpo inteiro, inclua também uma versão de corpo inteiro frontal e uma versão de corpo inteiro em 45 graus.
Se não houver referência suficiente de corpo inteiro, não invente um corpo de modelo; apenas estime de forma conservadora a partir das fotos disponíveis.

Regras de fidelidade:
não embelezar excessivamente.
não afinar o rosto.
não mudar nariz, olhos, boca ou formato do rosto.
não trocar textura do cabelo.
não mudar idade aparente.
não transformar a pessoa em modelo genérico.
não criar traços novos.
não alterar tipo corporal.
não forçar perfil lateral.
não criar ângulos que não existem nas referências.
não exagerar maquiagem.
não suavizar demais a pele.

Estilo visual:
fotografia realista de estúdio, fundo neutro claro, iluminação suave e uniforme, pele natural com textura real, olhos nítidos, proporções corretas, aparência limpa e profissional.

Resultado esperado:
um style sheet realista e consistente da mesma pessoa, limitado aos ângulos frontal e 45 graus, servindo como base segura para gerar ensaios fotográficos mantendo a identidade do cliente.`;

export const buildClientStyleSheetPrompt = () => CLIENT_STYLE_SHEET_PROMPT;

const cleanPrompt = (value, fallback = '') => {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
};

const withoutTerminalPeriod = (value) => cleanPrompt(value).replace(/\.+$/g, '');

export const getBookPanoramaReferences = (references = []) => (
  Array.isArray(references) ? references.filter(Boolean).slice(0, MAX_BOOK_BATCH_PHOTOS) : []
);

export const getBookBatchReferences = getBookPanoramaReferences;

export const chunkBookReferences = (references = [], batchSize = BOOK_BATCH_SIZE, packagePhotoCount = null) => {
  const selected = getBookBatchReferences(references);
  const chunks = [];
  const maxSize = Math.min(1, Math.max(1, Number(batchSize) || BOOK_BATCH_SIZE));
  const packageCount = Number(packagePhotoCount || 0);
  let index = 0;

  while (index < selected.length) {
    let nextBoundary = index + maxSize;

    if (packageCount > index && packageCount < nextBoundary) {
      nextBoundary = packageCount;
    } else if (index < packageCount && packageCount - index < maxSize) {
      nextBoundary = packageCount;
    }

    chunks.push(selected.slice(index, Math.min(nextBoundary, selected.length)));
    index = nextBoundary;
  }

  return chunks.filter((chunk) => chunk.length > 0);
};

const NEGATIVE_IDENTITY_PROMPT = [
  'different woman',
  'different person',
  'different face',
  'model face',
  'copied face from reference model',
  'generic AI beauty face',
  'changed identity',
  'altered nose',
  'altered eyes',
  'altered mouth',
  'changed smile',
  'changed jawline',
  'changed cheekbones',
  'different skin tone',
  'lighter skin tone',
  'different ethnicity',
  'different age',
  'face slimming',
  'plastic skin',
  'over-retouched skin',
  'heavy beauty filter',
  'exaggerated makeup',
  'unrealistic teeth',
  'distorted hands',
  'extra fingers',
  'deformed body',
  'wrong anatomy',
  'blurry face',
  'low detail face',
  'changed body type',
  'altered body proportions',
  'slimmer waist than client',
  'wider hips than client',
  'smaller arms than client',
  'longer legs than client',
  'idealized body',
  'editorial model body',
  'body of the reference model',
  'unrealistic silhouette'
].join(', ');

export const sanitizeBookReferencePrompt = (value, fallback = 'Portrait styling reference') => {
  let prompt = cleanPrompt(value);
  if (!prompt) return fallback;

  prompt = prompt
    .replace(/\bnegative\s+prompt\b\s*:?\s*[\s\S]*$/i, '')
    .replace(/\byoung\s+(woman|man|person)\b/gi, 'adult $1')
    .replace(/\bteen(?:age|ager)?\s+(?:woman|man|person|girl|boy)\b/gi, 'adult person')
    .replace(/\b(?:in\s+her|in\s+his|in\s+their)\s+(?:[2-7]0s|twenties|thirties|forties|fifties|sixties)\b/gi, 'adult')
    .replace(/\b\d{2}\s*-\s*year\s*-\s*old\b/gi, 'adult')
    .replace(/\b\d{2}\s*years?\s*old\b/gi, 'adult')
    .replace(/\bsleeveless\b/gi, 'elegant')
    .replace(/\bunhas\s+grandes\s+e\s+stiletto\b/gi, 'unhas longas e pontiagudas')
    .replace(/\bunhas\s+stiletto\b/gi, 'unhas pontiagudas')
    .replace(/\bstiletto\s+nails?\b/gi, 'long pointed manicure')
    .replace(/\bstiletto\s+manicure\b/gi, 'long pointed manicure')
    .replace(/\bstiletto\b/gi, 'pointed')
    .replace(/\bbad\s+anatomy\b/gi, 'distorted pose')
    .replace(/\bunrealistic\s+body\s+proportions\b/gi, 'unrealistic pose')
    .replace(/\bplastic\s+skin\b/gi, 'heavy retouching')
    .replace(/\bunnatural\s+skin\b/gi, 'heavy retouching')
    .replace(/\bbody\s+proportions\b/gi, 'overall appearance')
    .replace(/\bbody\s+position\b/gi, 'pose')
    .replace(/\bnatural\s+skin\s+texture\b/gi, 'realistic complexion')
    .replace(/\bskin\s+texture\b/gi, 'realistic complexion')
    .replace(/\bdeformed\s+face\b/gi, 'warped face')
    .replace(/\bdistorted\s+hands\b/gi, 'warped hands')
    .replace(/\bextra\s+fingers\b/gi, 'finger artifacts')
    .replace(/\bcrossed\s+eyes\b/gi, 'misaligned gaze')
    .replace(/\bstrange\s+smile\b/gi, 'awkward expression')
    .replace(/\b(?:subtle\s+|slight\s+|gentle\s+)?closed\s*-\s*mouth\s+smile\b/gi, 'her natural smile style as shown in the client reference photos')
    .replace(/\b(?:broad|beaming|wide)\s+smile(?:\s+with\s+teeth)?\b/gi, 'her natural smile style as shown in the client reference photos')
    .replace(/\bwarm,\s*inviting\s+smile\b/gi, 'her natural smile style as shown in the client reference photos')
    .replace(/\boverprocessed\s+image\b/gi, 'heavy retouching')
    .replace(/\b(stunning|beautiful|gorgeous|pretty|attractive)\s+(?:adult\s+)?(woman|man|person|subject)\b/gi, 'adult subject')
    .replace(/\bmodel\s+face\b/gi, 'style reference face')
    .replace(/\bgeneric\s+AI\s+beauty\s+face\b/gi, 'generic beauty styling')
    .replace(/\b(?:a|an)\s+adult\s+subject\s+with\s+[^.]*?\bhair\b[^.]*\./gi, 'An adult subject with client-compatible hairstyling.')
    .replace(/\b(?:she|he|they)\s+has\s+[^.]*?\b(?:smile|complexion|gaze|face|eyes|nose|mouth|jawline|cheekbones)\b[^.]*\.?/gi, 'The subject has a natural camera-facing expression.')
    .replace(/\b(?:woman|man|person|subject)\s+with\s+(?:long|short|medium-length|voluminous|brunette|blonde|auburn|brown|black|red|gray|grey|silver|highlighted|wavy|straight|curly|textured|soft|golden|dark|light|natural|loose|polished|styled|hair|featuring|in|and|,|\s)+hair\b/gi, 'subject with client-compatible hairstyling')
    .replace(/\bglowing\s+complexion\b/gi, 'soft professional skin lighting')
    .replace(/\bgentle\s+gaze\s+directed\s+at\s+the\s+camera\b/gi, 'camera-facing gaze')
    .replace(/\bfitted\s+bodice\b/gi, 'tailored bodice adapted naturally to body shape')
    .replace(/\bskin\s*-\s*tight\b/gi, 'tailored elegant')
    .replace(/\bwaist\s*-\s*cinching\b/gi, 'flattering tailored')
    /* Visual Simplification replacements */
    .replace(/\bethereal\s+(?:natural\s+)?light(?:ing)?\b/gi, 'soft even studio lighting')
    .replace(/\bcinematic\s+depth(?:\s+of\s+field|\s*-\s*of\s*-\s*field)?\b/gi, 'moderate depth of field')
    .replace(/\b(?:wide\s+aperture|high\s*-\s*end\s+(?:portrait\s+)?lens|lens\s+compression|heavy\s+bokeh|dramatic\s+bokeh)\b/gi, 'professional portrait look')
    .replace(/\bintricate\s+floral\s+(?:details|elements)\b/gi, 'simple pastel floral decor')
    .replace(/\b(?:abundant\s+arrangements|abundant\s+decorations|elaborate\s+set\s+design)\b/gi, 'a few floral arrangements')
    .replace(/\b(?:hanging\s+sheer\s+fabrics|layered\s+background\s+depth)\b/gi, 'soft neutral backdrop')
    .replace(/\bglowing\s+taper\s+candles\b/gi, 'warm decorative candles')
    .replace(/\b(?:detailed\s+skin\s+pores|subtle\s+skin\s+pores|skin\s+pores|hyperrealistic\s+micro\s*-\s*details)\b/gi, 'natural skin texture')
    .replace(/\bpremium\s+editorial\s+complexity\b/gi, 'clean studio editorial style')
    .replace(/\b(?:volumetric\s+light|glowing\s+highlights)\b/gi, 'soft warm light')
    .replace(/\bcomplex\s+shadows\b/gi, 'gentle shadows')
    .replace(/\bcomplex\s+fabric\s+texture\b/gi, 'clean fabric styling')
    .replace(/\bA\s+adult\s+subject\b/g, 'An adult subject')
    .replace(/\bShe\b/g, 'The subject')
    .replace(/\bHe\b/g, 'The subject')
    .replace(/\.{2,}/g, '.')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.])/g, '$1')
    .trim();

  return prompt || fallback;
};

export const sanitizeClientSupportDescription = (value, fallback = '') => {
  const description = cleanPrompt(value);
  if (!description) return fallback;

  const blockedContext = /\b(selfie|mirror|phone|bag|purse|belt|watch|shirt|top|blouse|jeans|denim|pants|trousers|skirt|shorts|dress|jacket|coat|outfit|clothing|wearing|tucked|sleeve|sleeved|background|environment|room|wall|studio|standing|seated|sitting|leaning|holding|posing)\b/i;
  const parts = description
    .replace(/\bnegative\s+prompt\b\s*:?\s*[\s\S]*$/i, '')
    .replace(/\b(?:in\s+her|in\s+his|in\s+their)\s+(?:[2-7]0s|twenties|thirties|forties|fifties|sixties)\b/gi, '')
    .replace(/\b\d{2}\s*-\s*year\s*-\s*old\b/gi, '')
    .replace(/\b\d{2}\s*years?\s*old\b/gi, '')
    .replace(/\b(?:subtle\s+|slight\s+|gentle\s+)?closed\s*-\s*mouth\s+smile\b/gi, 'natural smile style')
    .split(/[.;\n]+/)
    .map(part => part.trim())
    .filter(Boolean)
    .filter(part => !blockedContext.test(part));

  const cleaned = parts.join('. ')
    .replace(/\.{2,}/g, '.')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.])/g, '$1')
    .trim();

  return cleaned || fallback;
};

const getBirthdayOverride = (promptDetails = '') => {
  const details = cleanPrompt(promptDetails);
  if (!details) return '';

  const portugueseMatch = details.match(/\banivers[aá]rio(?:\s+de)?\s+\d+\s+anos?\b/i);
  if (portugueseMatch) return portugueseMatch[0];

  const englishMatch = details.match(/\b\d+(?:st|nd|rd|th)\s+birthday\b/i);
  if (englishMatch) return englishMatch[0];

  return '';
};

export const applyPromptDetailsOverrides = (referencePrompt = '', promptDetails = '') => {
  const reference = sanitizeBookReferencePrompt(referencePrompt, 'Portrait pose');
  const birthdayOverride = getBirthdayOverride(promptDetails);

  if (!birthdayOverride) return reference;

  const withBirthdayOverride = reference
    .replace(/\banivers[aá]rio\s+de\s+\d+\s+anos?\b/gi, birthdayOverride)
    .replace(/\b\d+\s*(?:anos?)?\s*(?:de\s+)?anivers[aá]rio\b/gi, birthdayOverride)
    .replace(/\b\d+(?:st|nd|rd|th)\s+birthday\b/gi, birthdayOverride)
    .replace(/\bbirthday\s+(?:of\s+)?\d+\s*(?:years?\s*old|yo|anos?)?\b/gi, birthdayOverride)
    .replace(/\b(?:in\s+her|in\s+his|in\s+their)\s+(?:[2-7]0s|twenties|thirties|forties|fifties|sixties)\b/gi, '')
    .replace(/\b\d{2}\s*-\s*year\s*-\s*old\b/gi, '')
    .replace(/\b\d{2}\s*years?\s*old\b/gi, '');

  return sanitizeBookReferencePrompt(withBirthdayOverride, 'Portrait pose');
};

export const buildBookGenerationPrompt = ({
  referenceName = '',
  referencePrompt = '',
  promptDetails = '',
  clientDescription = ''
} = {}) => {
  const normalizedReferencePrompt = applyPromptDetailsOverrides(referencePrompt, promptDetails);
  const additionalDetails = sanitizeBookReferencePrompt(promptDetails, '');
  const identityDescription = sanitizeClientSupportDescription(clientDescription);
  const selectedReference = cleanPrompt(referenceName);

  return [
    'IDENTITY LOCK (PRIMARY):',
    'Use the uploaded client face reference images as the primary identity source. The final image must look like the same person from the client photos. Preserve facial structure, eye shape, nose shape, mouth shape, natural smile style, cheek structure, jawline, skin tone, hairline, hair color, highlighted hair details and apparent age.',
    'If a synthesized client style sheet is included, treat it as the strongest identity reference for frontal and 45-degree likeness. Keep the client recognizable from those two angles only.',
    identityDescription ? `Client face support notes: ${withoutTerminalPeriod(identityDescription)}.` : '',
    '',
    'BODY LOCK (PRIMARY):',
    'Use the uploaded client full-body reference images as the primary source for body shape, natural proportions and overall silhouette. Preserve the client’s real physique, including shoulder width, arm volume, waist shape, hip width, leg shape and overall body proportions. Do not replace, idealize or significantly alter the client’s body type. Do not use the body type, silhouette or body proportions of the style reference model. All outfits and clothing must be adapted naturally to the client’s real body proportions, without slimming, reshaping or idealizing her silhouette. Do not preserve casual clothing, bags, belts, watches, phones, mirror-selfie framing, room details or background from the client support photos unless explicitly requested.',
    '',
    'REFERENCE HIERARCHY:',
    '1. Client Face = PRIMARY source for identity and facial features.',
    '2. Client Body = PRIMARY source for body shape, real physique and natural proportions.',
    '3. Style Reference Image/Prompt = SECONDARY source for pose, outfit mood, scene composition, lighting direction, color palette, props and atmosphere only. Never extract or adapt body shape or proportions from the style reference.',
    '',
    'STYLE / POSE / SCENE REFERENCE:',
    'Use the selected reference prompt, and any selected style/pose reference image included with the task, only for pose, outfit mood, scene composition, lighting direction, color palette, props and atmosphere. All clothing styles must be adapted to fit the client’s real body type without altering her physical proportions. Do not use the face, facial features, ethnicity, identity, apparent age, body type or body proportions from the selected style reference.',
    'Pose and camera direction must stay easy to reproduce with the client style sheet: use frontal or 45-degree three-quarter angles only, with the face visible. Do not request side profile, back view or hard-to-match angles.',
    selectedReference ? `Selected reference name: ${withoutTerminalPeriod(selectedReference)}.` : '',
    `Scene/style prompt: ${withoutTerminalPeriod(normalizedReferencePrompt)}.`,
    additionalDetails ? `Additional prompt override: ${withoutTerminalPeriod(additionalDetails)}.` : '',
    'If the selected reference prompt conflicts with the additional prompt about birthday age or anniversary number, the additional prompt wins.',
    '',
    'CAMERA / QUALITY:',
    'Photorealistic professional portrait, natural skin texture, natural retouching, soft even studio lighting, sharp focus on the client face, clean studio style, high-resolution details, moderate depth of field with background softly separated, elegant studio photography.',
    '',
    'IMPORTANT:',
    'Both face and body identity fidelity are more important than matching the style reference model. The face and real body proportions of the client must remain recognizably preserved. The style reference may influence only pose, clothing mood, setting, props, lighting, color palette and composition.',
    `NEGATIVE PROMPT: ${NEGATIVE_IDENTITY_PROMPT}.`
  ].filter(Boolean).join('\n');
};

export const buildBookMasterPrompt = ({
  references = [],
  promptDetails = '',
  clientDescription = ''
} = {}) => {
  const additionalDetails = sanitizeBookReferencePrompt(promptDetails, '');
  const identityDescription = sanitizeClientSupportDescription(clientDescription, '');
  const header = [
    'IDENTITY LOCK (PRIMARY): use uploaded client face reference photos as the primary identity source for every generated image. If a synthesized client style sheet is included, treat it as the strongest identity reference for frontal and 45-degree likeness. Preserve the same person, facial structure, eye shape, nose shape, mouth shape, natural smile style, cheek structure, jawline, skin tone, hairline, hair color and apparent age.',
    identityDescription ? `Client face support notes: ${identityDescription}.` : '',
    'BODY LOCK (PRIMARY): use uploaded client full-body reference images as the primary source for body shape, natural proportions and overall silhouette. Preserve the client’s real physique, shoulder width, arm volume, waist shape, hip width, leg shape and overall body proportions. Do not replace, idealize or significantly alter the client’s body type. Do not use the body type, silhouette or body proportions of the style reference model. All outfits and clothing must be adapted naturally to the client’s real body proportions, without slimming, reshaping or idealizing her silhouette. Do not preserve casual outfit, accessories, phone, mirror-selfie framing or background from those photos.',
    'REFERENCE HIERARCHY: Client Face = PRIMARY; Client Body = PRIMARY; Style Reference Image/Prompt = SECONDARY (pose, outfit, scene, lighting, props and atmosphere only).',
    'STYLE / POSE / SCENE REFERENCE: each selected reference image or prompt must influence only pose, outfit mood, scene composition, lighting direction, color palette, props and atmosphere. All clothing styles must be adapted to fit the client’s real body type without altering her physical proportions. Never copy the model face, facial features, ethnicity, identity, apparent age, body shape or body proportions from a style reference. Keep pose prompts easy to reproduce from frontal or 45-degree client style sheet views only.',
    'If a reference prompt conflicts with the additional prompt about birthday age or anniversary number, the additional prompt wins.',
    additionalDetails ? `Additional prompt override for all images: ${additionalDetails}.` : '',
    `NEGATIVE PROMPT FOR ALL IMAGES: ${NEGATIVE_IDENTITY_PROMPT}.`
  ].filter(Boolean).join('\n');

  const referencePrompts = references.map((reference, index) => {
    const prompt = applyPromptDetailsOverrides(reference.prompt, promptDetails);
    const name = cleanPrompt(reference.name);
    return `Referencia ${index + 1}${name ? ` (${name})` : ''}: ${prompt}`;
  }).join('\n');

  return `${header}\n${referencePrompts}`.trim();
};

export const buildBookBatchPrompt = ({
  references = [],
  promptDetails = '',
  clientDescription = ''
} = {}) => {
  const selectedReference = references.filter(Boolean)[0] || {};
  const additionalDetails = sanitizeBookReferencePrompt(promptDetails, '');
  const identityDescription = sanitizeClientSupportDescription(clientDescription, '');
  const prompt = applyPromptDetailsOverrides(selectedReference.prompt, promptDetails);
  const name = cleanPrompt(selectedReference.name || selectedReference.category, 'Reference 1');

  return [
    'OUTPUT FORMAT:',
    `Generate one single vertical ${BOOK_BATCH_ASPECT_RATIO} portrait image at ${BOOK_BATCH_RESOLUTION} resolution.`,
    'This task must create exactly one finished photo only. Do not create panels, batches, grids, contact sheets, collages or multiple photos inside the same image.',
    'Do not add text, labels, numbers, captions, watermarks, UI frames, borders or duplicated reference thumbnails.',
    '',
    'IDENTITY LOCK (PRIMARY):',
    'Use the uploaded client face reference images as the primary identity source. The final image must look like the same person from the client photos. Preserve facial structure, eye shape, nose shape, mouth shape, natural smile style, cheek structure, jawline, skin tone, hairline, hair color, highlighted hair details and apparent age.',
    'If a synthesized client style sheet is included, treat it as the strongest identity reference for frontal and 45-degree likeness. Keep the client recognizable from those two angles only.',
    identityDescription ? `Client face support notes: ${withoutTerminalPeriod(identityDescription)}.` : '',
    '',
    'BODY LOCK (PRIMARY):',
    'Use the uploaded client full-body reference images as the primary source for body shape, natural proportions and overall silhouette. Preserve the client real physique, including shoulder width, arm volume, waist shape, hip width, leg shape and overall body proportions. Do not replace, idealize or significantly alter the client body type. Do not use the body type, silhouette or body proportions of any style reference model.',
    '',
    'REFERENCE HIERARCHY:',
    '1. Client Face = PRIMARY source for identity and facial features.',
    '2. Client Body = PRIMARY source for body shape, real physique and natural proportions.',
    '3. Style Reference Image/Prompt = SECONDARY source for pose, outfit mood, scene composition, lighting direction, color palette, props and atmosphere only.',
    '',
    'STYLE / POSE / SCENE REFERENCE:',
    `Selected reference name: ${withoutTerminalPeriod(name)}.`,
    `Scene/style prompt: ${withoutTerminalPeriod(prompt)}.`,
    'Pose and camera direction must stay easy to reproduce with the client style sheet: use frontal or 45-degree three-quarter angles only, with the face visible. Do not request side profile, back view or hard-to-match angles.',
    additionalDetails ? `Additional prompt override: ${withoutTerminalPeriod(additionalDetails)}.` : '',
    'If the selected reference prompt conflicts with the additional prompt about birthday age or anniversary number, the additional prompt wins.',
    '',
    'CAMERA / QUALITY:',
    `Photorealistic professional portrait, ${BOOK_BATCH_RESOLUTION} quality, natural skin texture, natural retouching, soft even studio lighting, sharp focus on the client face, high-resolution details, clean elegant studio photography, consistent color grading.`,
    '',
    'IMPORTANT:',
    'Do not copy or blend the face, facial features, ethnicity, apparent age, body shape or body proportions from any style reference. Both face and body identity fidelity are more important than matching a style reference model.',
    `NEGATIVE PROMPT: ${NEGATIVE_IDENTITY_PROMPT}.`
  ].filter(Boolean).join('\n');
};

export const buildBookBatchMasterPrompt = ({
  references = [],
  promptDetails = '',
  clientDescription = '',
  packagePhotoCount = null
} = {}) => {
  const batches = chunkBookReferences(references, BOOK_BATCH_SIZE, packagePhotoCount);
  return batches.map((batch, index) => buildBookBatchPrompt({
    references: batch,
    promptDetails,
    clientDescription,
    batchIndex: index,
    batchTotal: batches.length
  })).join('\n\n--- NEXT BATCH ---\n\n');
};

export const buildBookPanoramaPrompt = buildBookBatchPrompt;
