import { getMercadoPagoPayment } from '../_lib/mercadoPago.js';
import { syncMercadoPagoPayment, toBookClientPatch } from '../_lib/bookPaymentServer.js';
import { readJsonBody, sendJson } from '../_lib/http.js';
import { getSupabaseAdmin } from '../_lib/supabaseServer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Metodo nao permitido.' });
  }

  try {
    const body = readJsonBody(req);
    const paymentId = body.paymentId || body.collectionId;
    const paymentRequestId = body.paymentRequestId;

    if (!paymentId && !paymentRequestId) {
      return sendJson(res, 400, { error: 'Informe paymentId ou paymentRequestId.' });
    }

    if (!paymentId) {
      return sendJson(res, 200, {
        approved: false,
        status: 'pending'
      });
    }

    const supabase = getSupabaseAdmin();
    const mercadoPagoPayment = await getMercadoPagoPayment(paymentId);
    const result = await syncMercadoPagoPayment({
      supabase,
      mercadoPagoPayment,
      paymentRequestId
    });

    return sendJson(res, 200, {
      approved: result.approved,
      status: result.status,
      book: result.book ? toBookClientPatch(result.book) : null
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || 'Erro ao verificar pagamento Mercado Pago.' });
  }
}
