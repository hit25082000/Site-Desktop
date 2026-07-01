import { splitSelectedPhotoIdsByPackage } from './bookPayment.js';

const isFilled = (value) => value !== '' && value !== null && value !== undefined;

const toNumberOrNull = (value) => {
  if (!isFilled(value)) return null;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
};

const toPositiveIntegerOrNull = (value) => {
  const numberValue = toNumberOrNull(value);
  if (numberValue === null) return null;
  return Number.isInteger(numberValue) && numberValue > 0 ? numberValue : null;
};

const hasPackageValues = (pricing) =>
  isFilled(pricing.packagePrice) ||
  isFilled(pricing.packagePhotos) ||
  isFilled(pricing.extraPhotoPrice);

const hasPhotoValue = (pricing) => isFilled(pricing.pricePerPhoto);

export const isPrepaidPackage = (book = {}) => {
  const price = book.packagePrice ?? book.package_price;
  const photos = book.packagePhotos ?? book.package_photos;
  return price === 0 && Number(photos) > 0;
};

export const hasPackagePricing = (book = {}) =>
  (book.packagePrice ?? book.package_price) !== null &&
  (book.packagePrice ?? book.package_price) !== undefined;

export const normalizeBookPricing = (pricing = {}) => {
  if (hasPackageValues(pricing)) {
    const packagePrice = toNumberOrNull(pricing.packagePrice);
    const packagePhotos = toPositiveIntegerOrNull(pricing.packagePhotos);
    const rawExtra = pricing.extraPhotoPrice;
    const hasExplicitExtraPrice = rawExtra !== undefined && rawExtra !== null && rawExtra !== '';
    const extraPhotoPrice = hasExplicitExtraPrice ? toNumberOrNull(rawExtra) : null;

    if (packagePrice === 0 && packagePhotos !== null) {
      if (extraPhotoPrice === null || extraPhotoPrice <= 0) {
        return {
          valid: false,
          error: 'Informe um preço maior que zero por foto extra do pacote pré-pago.'
        };
      }
      return {
        valid: true,
        pricing: {
          pricePerPhoto: null,
          packagePrice: 0,
          packagePhotos,
          extraPhotoPrice
        },
        dbPayload: {
          price_per_photo: null,
          package_price: 0,
          package_photos: packagePhotos,
          extra_photo_price: extraPhotoPrice
        }
      };
    }

    if (packagePrice === null || packagePhotos === null || extraPhotoPrice === null) {
      return {
        valid: false,
        error: 'Preencha todos os campos do pacote com valores válidos.'
      };
    }

    return {
      valid: true,
      pricing: {
        pricePerPhoto: null,
        packagePrice,
        packagePhotos,
        extraPhotoPrice
      },
      dbPayload: {
        price_per_photo: null,
        package_price: packagePrice,
        package_photos: packagePhotos,
        extra_photo_price: extraPhotoPrice
      }
    };
  }

  const pricePerPhoto = toNumberOrNull(pricing.pricePerPhoto);
  if (!hasPhotoValue(pricing) || pricePerPhoto === null) {
    return {
      valid: false,
      error: 'Informe o preço por foto ou configure o pacote completo.'
    };
  }

  return {
    valid: true,
    pricing: {
      pricePerPhoto,
      packagePrice: null,
      packagePhotos: null,
      extraPhotoPrice: null
    },
    dbPayload: {
      price_per_photo: pricePerPhoto,
      package_price: null,
      package_photos: null,
      extra_photo_price: null
    }
  };
};

export const getBookSelectedPhotoIds = (book = {}) => {
  if (Array.isArray(book.selectedPhotoIds)) return book.selectedPhotoIds;
  if (Array.isArray(book.selected_photo_ids)) return book.selected_photo_ids;
  return [];
};

export const reconcileSelectedPhotoIds = (selectedPhotoIds = [], photos = []) => {
  const validPhotoIds = new Set(photos.map((photo) => photo.id));
  return selectedPhotoIds.filter((photoId) => validPhotoIds.has(photoId));
};

export const applyPhotoReplacement = ({
  currentPhotos = [],
  nextPhotos = [],
  selectedPhotoIds = [],
  mode = 'replace'
} = {}) => {
  const photos = mode === 'append'
    ? [...currentPhotos, ...nextPhotos]
    : nextPhotos;

  return {
    photos,
    selectedPhotoIds: reconcileSelectedPhotoIds(selectedPhotoIds, photos)
  };
};

const getPackagePhotos = (book = {}) => {
  const value = book.packagePhotos ?? book.package_photos;
  const numberValue = Number(value || 0);
  return Number.isFinite(numberValue) ? numberValue : 0;
};

const cleanPhotoPayment = (photo) => {
  const nextPhoto = { ...photo };
  if (nextPhoto.paymentStatus === 'paid') {
    nextPhoto.paymentStatus = 'pending';
    nextPhoto.section = 'additional';
  }
  return nextPhoto;
};

export const applyBookPaymentAction = (book = {}, action) => {
  const photos = Array.isArray(book.photos) ? book.photos : [];
  const selectedPhotoIds = getBookSelectedPhotoIds(book);
  let paidIds;
  let nextSelectedPhotoIds = selectedPhotoIds;

  if (action === 'mark_all_paid') {
    paidIds = photos
      .filter((photo) => photo.status !== 'generating' && photo.status !== 'failed')
      .map((photo) => photo.id);
    nextSelectedPhotoIds = paidIds;
  } else if (action === 'mark_package_paid') {
    const packageCount = getPackagePhotos(book);
    paidIds = splitSelectedPhotoIdsByPackage(selectedPhotoIds, photos, packageCount).packageIds;
  } else if (action === 'mark_selected_paid') {
    paidIds = selectedPhotoIds;
  } else if (action === 'clear_paid') {
    const nextPhotos = photos.map(cleanPhotoPayment);
    const nextBook = {
      ...book,
      photos: nextPhotos,
      paymentStatus: 'pending',
      payment_status: 'pending',
      selectedPhotoIds: nextSelectedPhotoIds,
      selected_photo_ids: nextSelectedPhotoIds
    };

    return {
      book: nextBook,
      dbPayload: {
        payment_status: 'pending',
        selected_photo_ids: nextSelectedPhotoIds,
        photos: nextPhotos
      }
    };
  } else {
    return {
      error: 'Ação de pagamento inválida.'
    };
  }

  if (action !== 'mark_all_paid' && paidIds.length === 0) {
    return {
      error: 'Selecione ao menos uma foto antes de marcar como pago.'
    };
  }

  const paidSet = new Set(paidIds);
  const selectedSet = new Set(nextSelectedPhotoIds);
  const nextPhotos = photos.map((photo) => {
    if (!selectedSet.has(photo.id) && action !== 'mark_all_paid') return photo;
    return {
      ...photo,
      paymentStatus: paidSet.has(photo.id) ? 'paid' : 'pending',
      section: paidSet.has(photo.id) ? 'saved' : 'additional'
    };
  });

  const validPhotos = nextPhotos.filter((photo) => photo.status !== 'generating' && photo.status !== 'failed');
  const allPhotosPaid = validPhotos.length > 0 && validPhotos.every((photo) => photo.paymentStatus === 'paid');
  const hasSomePaid = nextPhotos.some((photo) => photo.paymentStatus === 'paid');
  const paymentStatus = allPhotosPaid ? 'paid' : hasSomePaid ? 'partial_paid' : 'pending';

  const nextBook = {
    ...book,
    photos: nextPhotos,
    paymentStatus,
    payment_status: paymentStatus,
    selectedPhotoIds: nextSelectedPhotoIds,
    selected_photo_ids: nextSelectedPhotoIds
  };

  return {
    book: nextBook,
    dbPayload: {
      payment_status: paymentStatus,
      selected_photo_ids: nextSelectedPhotoIds,
      photos: nextPhotos
    }
  };
};
