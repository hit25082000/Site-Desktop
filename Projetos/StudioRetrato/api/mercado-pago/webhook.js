import { getMercadoPagoPayment, validateMercadoPagoWebhookSignature } from '../_lib/mercadoPago.js';
import { sendJson } from '../_lib/http.js';
import { syncMercadoPagoPayment } from '../_lib/bookPaymentServer.js';
import { getSupabaseAdmin } from '../_lib/supabaseServer.js';

const getQueryValue = (req, key) => {
  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  return url.searchParams.get(key);
};

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Metodo nao permitido.' });
  }

  try {
    const body = typeof req.body === 'object' && req.body ? req.body : {};
    const dataId = body?.data?.id || getQueryValue(req, 'data.id') || getQueryValue(req, 'id');
    const type = body?.type || getQueryValue(req, 'type') || getQueryValue(req, 'topic');
    const requestId = req.headers['x-request-id'];
    const signatureHeader = req.headers['x-signature'];

    if (!dataId || (type && !String(type).includes('payment'))) {
      return sendJson(res, 200, { received: true, ignored: true });
    }

    const validSignature = validateMercadoPagoWebhookSignature({
      dataId,
      requestId,
      signatureHeader
    });

    if (!validSignature) {
      return sendJson(res, 401, { error: 'Assinatura Mercado Pago invalida.' });
    }

    const supabase = getSupabaseAdmin();
    const mercadoPagoPayment = await getMercadoPagoPayment(dataId);
    await syncMercadoPagoPayment({
      supabase,
      mercadoPagoPayment
    });

    return sendJson(res, 200, { received: true });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || 'Erro ao processar webhook Mercado Pago.' });
  }
}
