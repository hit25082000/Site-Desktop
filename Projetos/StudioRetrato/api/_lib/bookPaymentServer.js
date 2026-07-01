import {
  applyConfirmedPaymentToBook,
  calculateBookPaymentQuote
} from '../../src/services/bookPayment.js';

export const fetchBookForPayment = async (supabase, bookId) => {
  const { data, error } = await supabase
    .from('books')
    .select('id,title,photos,selected_photo_ids,payment_status,price_per_photo,package_price,package_photos,extra_photo_price')
    .eq('id', bookId)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Book nao encontrado.');

  return {
    id: data.id,
    title: data.title,
    photos: Array.isArray(data.photos) ? data.photos : [],
    selectedPhotoIds: Array.isArray(data.selected_photo_ids) ? data.selected_photo_ids : [],
    paymentStatus: data.payment_status,
    pricePerPhoto: data.price_per_photo !== null && data.price_per_photo !== undefined ? Number(data.price_per_photo) : null,
    packagePrice: data.package_price !== null && data.package_price !== undefined ? Number(data.package_price) : null,
    packagePhotos: data.package_photos !== null && data.package_photos !== undefined ? Number(data.package_photos) : null,
    extraPhotoPrice: data.extra_photo_price !== null && data.extra_photo_price !== undefined ? Number(data.extra_photo_price) : null
  };
};

export const toBookClientPatch = (book) => ({
  selectedPhotoIds: book.selectedPhotoIds || book.selected_photo_ids || [],
  photos: book.photos || [],
  paymentStatus: book.paymentStatus || book.payment_status || 'pending'
});

export const saveBookPaymentState = async (supabase, book) => {
  const selectedPhotoIds = book.selectedPhotoIds || book.selected_photo_ids || [];
  const paymentStatus = book.paymentStatus || book.payment_status || 'pending';
  const { error } = await supabase
    .from('books')
    .update({
      selected_photo_ids: selectedPhotoIds,
      photos: book.photos || [],
      payment_status: paymentStatus
    })
    .eq('id', book.id);

  if (error) throw error;
};

export const saveBookSelectionOnly = async (supabase, bookId, selectedPhotoIds) => {
  const { error } = await supabase
    .from('books')
    .update({ selected_photo_ids: selectedPhotoIds })
    .eq('id', bookId);

  if (error) throw error;
};

export const finalizePaymentRecord = async ({ supabase, paymentRecord, mercadoPagoPayment }) => {
  if (!paymentRecord) throw new Error('Registro de pagamento nao encontrado.');

  if (
    paymentRecord.external_reference &&
    mercadoPagoPayment?.external_reference &&
    paymentRecord.external_reference !== mercadoPagoPayment.external_reference
  ) {
    throw new Error('Referencia externa do pagamento nao corresponde ao book.');
  }

  const amountPaid = Number(mercadoPagoPayment?.transaction_amount || 0);
  const expectedAmount = Number(paymentRecord.amount || 0);
  if (amountPaid + 0.01 < expectedAmount) {
    throw new Error('Valor pago menor que o valor esperado para este book.');
  }

  if (mercadoPagoPayment?.currency_id && mercadoPagoPayment.currency_id !== 'BRL') {
    throw new Error('Moeda do pagamento nao corresponde ao book.');
  }

  const book = await fetchBookForPayment(supabase, paymentRecord.book_id);
  const selectedPhotoIds = Array.isArray(paymentRecord.selected_photo_ids)
    ? paymentRecord.selected_photo_ids
    : [];
  const payablePhotoIds = Array.isArray(paymentRecord.payable_photo_ids)
    ? paymentRecord.payable_photo_ids
    : calculateBookPaymentQuote(book, selectedPhotoIds).payablePhotoIds;

  const nextBook = applyConfirmedPaymentToBook(book, selectedPhotoIds, payablePhotoIds);
  await saveBookPaymentState(supabase, nextBook);

  const { error: paymentUpdateError } = await supabase
    .from('book_payments')
    .update({
      status: 'approved',
      mercado_pago_payment_id: String(mercadoPagoPayment.id),
      mercado_pago_status: mercadoPagoPayment.status,
      raw_response: mercadoPagoPayment
    })
    .eq('id', paymentRecord.id);

  if (paymentUpdateError) throw paymentUpdateError;

  return nextBook;
};

export const syncMercadoPagoPayment = async ({ supabase, mercadoPagoPayment, paymentRequestId }) => {
  const externalReference = mercadoPagoPayment?.external_reference || '';
  const parsedPaymentRequestId = paymentRequestId || externalReference.split(':payment:')[1];
  if (!parsedPaymentRequestId) {
    throw new Error('Pagamento sem referencia externa do book.');
  }

  const { data: paymentRecord, error } = await supabase
    .from('book_payments')
    .select('*')
    .eq('id', parsedPaymentRequestId)
    .single();

  if (error) throw error;
  if (!paymentRecord) throw new Error('Registro de pagamento nao encontrado.');

  if (paymentRecord.external_reference && externalReference !== paymentRecord.external_reference) {
    throw new Error('Referencia externa do pagamento nao corresponde ao registro interno.');
  }

  if (mercadoPagoPayment.status !== 'approved') {
    const { error: updateError } = await supabase
      .from('book_payments')
      .update({
        status: mercadoPagoPayment.status || 'pending',
        mercado_pago_payment_id: mercadoPagoPayment.id ? String(mercadoPagoPayment.id) : paymentRecord.mercado_pago_payment_id,
        mercado_pago_status: mercadoPagoPayment.status || null,
        raw_response: mercadoPagoPayment
      })
      .eq('id', paymentRecord.id);

    if (updateError) throw updateError;

    return {
      approved: false,
      status: mercadoPagoPayment.status || 'pending',
      paymentRecord
    };
  }

  const nextBook = await finalizePaymentRecord({
    supabase,
    paymentRecord,
    mercadoPagoPayment
  });

  return {
    approved: true,
    status: 'approved',
    paymentRecord,
    book: nextBook
  };
};
