import crypto from 'node:crypto';
import { calculateBookPaymentQuote, applyConfirmedPaymentToBook } from '../../src/services/bookPayment.js';
import { createMercadoPagoPreference } from '../_lib/mercadoPago.js';
import { fetchBookForPayment, saveBookPaymentState, saveBookSelectionOnly, toBookClientPatch } from '../_lib/bookPaymentServer.js';
import { getRequestOrigin, readJsonBody, sendJson } from '../_lib/http.js';
import { getSupabaseAdmin } from '../_lib/supabaseServer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Metodo nao permitido.' });
  }

  try {
    const body = readJsonBody(req);
    const bookId = body.bookId;
    const selectedPhotoIds = Array.isArray(body.selectedPhotoIds) ? body.selectedPhotoIds : [];

    if (!bookId) {
      return sendJson(res, 400, { error: 'bookId e obrigatorio.' });
    }

    const supabase = getSupabaseAdmin();
    const book = await fetchBookForPayment(supabase, bookId);
    const quote = calculateBookPaymentQuote(book, selectedPhotoIds);

    if (quote.selectedCount === 0) {
      return sendJson(res, 400, { error: 'Selecione ao menos uma foto.' });
    }

    if (!quote.requiresPayment) {
      if (quote.canFinalizeWithoutPayment && quote.payablePhotoIds.length > 0) {
        const nextBook = applyConfirmedPaymentToBook(book, quote.selectedIds, quote.payablePhotoIds);
        await saveBookPaymentState(supabase, nextBook);
        return sendJson(res, 200, {
          requiresPayment: false,
          paymentStage: quote.paymentStage,
          book: toBookClientPatch(nextBook)
        });
      }

      await saveBookSelectionOnly(supabase, book.id, quote.selectedIds);
      return sendJson(res, 200, {
        requiresPayment: false,
        paymentStage: quote.paymentStage,
        selectionOnly: true,
        book: {
          selectedPhotoIds: quote.selectedIds,
          photos: book.photos,
          paymentStatus: book.paymentStatus
        }
      });
    }

    const paymentRequestId = crypto.randomUUID();
    const externalReference = `studioretrato:book:${book.id}:payment:${paymentRequestId}`;
    const origin = getRequestOrigin(req);

    const { error: paymentInsertError } = await supabase
      .from('book_payments')
      .insert({
        id: paymentRequestId,
        book_id: book.id,
        selected_photo_ids: quote.selectedIds,
        payable_photo_ids: quote.payablePhotoIds,
        amount: quote.amountDueNow,
        status: 'created',
        external_reference: externalReference
      });

    if (paymentInsertError) throw paymentInsertError;

    await saveBookSelectionOnly(supabase, book.id, quote.selectedIds);

    const preference = await createMercadoPagoPreference({
      items: [
        {
          id: `book-${book.id}`,
          title: `Studio Retrato - ${book.title || 'Book'}`.slice(0, 80),
          quantity: 1,
          unit_price: quote.amountDueNow,
          currency_id: 'BRL'
        }
      ],
      external_reference: externalReference,
      metadata: {
        book_id: book.id,
        book_payment_id: paymentRequestId,
        payment_stage: quote.paymentStage
      },
      back_urls: {
        success: `${origin}/#/book/${book.id}?mp_payment_request=${paymentRequestId}`,
        failure: `${origin}/#/book/${book.id}?mp_payment_request=${paymentRequestId}`,
        pending: `${origin}/#/book/${book.id}?mp_payment_request=${paymentRequestId}`
      },
      auto_return: 'approved',
      notification_url: `${origin}/api/mercado-pago/webhook`
    });

    const { error: preferenceUpdateError } = await supabase
      .from('book_payments')
      .update({
        mercado_pago_preference_id: preference.id,
        status: 'preference_created',
        raw_response: preference
      })
      .eq('id', paymentRequestId);

    if (preferenceUpdateError) throw preferenceUpdateError;

    return sendJson(res, 200, {
      requiresPayment: true,
      paymentRequestId,
      paymentStage: quote.paymentStage,
      amount: quote.amountDueNow,
      initPoint: preference.init_point || preference.sandbox_init_point,
      sandboxInitPoint: preference.sandbox_init_point || null
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || 'Erro ao criar pagamento Mercado Pago.' });
  }
}
