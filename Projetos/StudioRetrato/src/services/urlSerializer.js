/**
 * Encodes a book payload into a URL-safe Base64 hash.
 */
export function encodeBookData(book, clientName) {
  try {
    const minifiedPhotos = (book.photos || []).map(p => ({
      id: p.id,
      url: p.url,
      vt: p.variationType
    }));

    const payload = {
      bId: book.id,
      cId: book.clientId,
      cN: clientName || book.clientName || 'Cliente',
      t: book.title,
      p: book.pricePerPhoto,
      pp: book.packagePrice,
      pph: book.packagePhotos,
      ep: book.extraPhotoPrice,
      ph: minifiedPhotos,
      pay: book.paymentStatus || 'pending',
      sel: book.selectedPhotoIds || [],
      rD: book.referencesData || [],
      pD: book.promptDetails || ''
    };

    const jsonString = JSON.stringify(payload);
    const utf8Bytes = new TextEncoder().encode(jsonString);
    
    let binString = "";
    for (let i = 0; i < utf8Bytes.length; i++) {
      binString += String.fromCharCode(utf8Bytes[i]);
    }
    
    return btoa(binString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    console.error('Error encoding book data:', e);
    return null;
  }
}

/**
 * Decodes a URL-safe Base64 hash back into a book object.
 */
export function decodeBookData(hash) {
  try {
    let base64 = hash.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const binString = atob(base64);
    const bytes = new Uint8Array(binString.length);
    for (let i = 0; i < binString.length; i++) {
      bytes[i] = binString.charCodeAt(i);
    }
    
    const jsonString = new TextDecoder().decode(bytes);
    const payload = JSON.parse(jsonString);

    return {
      id: payload.bId,
      clientId: payload.cId,
      clientName: payload.cN,
      title: payload.t,
      pricePerPhoto: payload.p,
      packagePrice: payload.pp ?? null,
      packagePhotos: payload.pph ?? null,
      extraPhotoPrice: payload.ep ?? null,
      photos: (payload.ph || []).map(p => ({
        id: p.id,
        url: p.url,
        variationType: p.vt
      })),
      paymentStatus: payload.pay,
      selectedPhotoIds: payload.sel || [],
      referencesData: payload.rD || [],
      promptDetails: payload.pD || ''
    };
  } catch (e) {
    console.error('Error decoding book data:', e);
    return null;
  }
}
