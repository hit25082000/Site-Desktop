import crypto from 'node:crypto';

const MERCADO_PAGO_BASE_URL = 'https://api.mercadopago.com';

export const getMercadoPagoAccessToken = () => process.env.MERCADO_PAGO_ACCESS_TOKEN;

export const mercadoPagoFetch = async (path, options = {}) => {
  const accessToken = getMercadoPagoAccessToken();
  if (!accessToken) {
    throw new Error('Configure MERCADO_PAGO_ACCESS_TOKEN no ambiente do servidor.');
  }

  const response = await fetch(`${MERCADO_PAGO_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = payload?.message || payload?.error || `Mercado Pago HTTP ${response.status}`;
    throw new Error(message);
  }

  return payload;
};

export const createMercadoPagoPreference = (payload) =>
  mercadoPagoFetch('/checkout/preferences', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const getMercadoPagoPayment = (paymentId) =>
  mercadoPagoFetch(`/v1/payments/${encodeURIComponent(paymentId)}`, {
    method: 'GET'
  });

const parseSignatureHeader = (signatureHeader = '') => signatureHeader
  .split(',')
  .map((part) => part.trim().split('='))
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

const safeEqualHex = (left, right) => {
  if (!left || !right || left.length !== right.length) return false;
  return crypto.timingSafeEqual(Buffer.from(left, 'hex'), Buffer.from(right, 'hex'));
};

export const validateMercadoPagoWebhookSignature = ({ dataId, requestId, signatureHeader }) => {
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
  if (!secret) return true;

  const signature = parseSignatureHeader(signatureHeader);
  const manifest = [
    dataId ? `id:${String(dataId).toLowerCase()};` : '',
    requestId ? `request-id:${requestId};` : '',
    signature.ts ? `ts:${signature.ts};` : ''
  ].join('');

  const expected = crypto
    .createHmac('sha256', secret)
    .update(manifest)
    .digest('hex');

  return safeEqualHex(expected, signature.v1);
};
