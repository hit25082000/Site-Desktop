const money = (value) => {
  const numberValue = Number(value || 0);
  if (!Number.isFinite(numberValue) || numberValue <= 0) return 0;
  return Math.round(numberValue * 100) / 100;
};

const getBookValue = (book, camelKey, snakeKey) => book?.[camelKey] ?? book?.[snakeKey];

const isPayablePhoto = (photo) => photo?.id && photo.status !== 'generating' && photo.status !== 'failed';

export const getPhotoUnitCount = (photo = {}) => {
  const count = Number(photo.photoCount ?? photo.batchCount ?? photo.panoramaCount ?? 1);
  return Number.isFinite(count) && count > 0 ? Math.floor(count) : 1;
};

export const getBookTotalPhotoCount = (photos = []) =>
  photos.reduce((total, photo) => total + getPhotoUnitCount(photo), 0);

const getPhotoById = (photos = []) => new Map(photos.map((photo) => [photo.id, photo]));

export const getSelectedPhotoUnitCount = (selectedPhotoIds = [], photos = []) => {
  const photoById = getPhotoById(photos);
  return selectedPhotoIds.reduce((total, photoId) => total + getPhotoUnitCount(photoById.get(photoId)), 0);
};

export const splitSelectedPhotoIdsByPackage = (selectedPhotoIds = [], photos = [], packageCount = 0) => {
  const photoById = getPhotoById(photos);
  const packageIds = [];
  const extraIds = [];
  let usedPackageSlots = 0;

  selectedPhotoIds.forEach((photoId) => {
    const photoCount = getPhotoUnitCount(photoById.get(photoId));
    if (usedPackageSlots + photoCount <= packageCount) {
      packageIds.push(photoId);
      usedPackageSlots += photoCount;
    } else {
      extraIds.push(photoId);
    }
  });

  return { packageIds, extraIds };
};

export const applyPrepaidPackageSections = (photos = [], packageCount = 0, prepaid = false) => {
  const packageLimit = Number(packageCount || 0);
  if (!prepaid || !Number.isFinite(packageLimit) || packageLimit <= 0) {
    return photos.map((photo) => ({
      ...photo,
      section: photo.section || 'additional'
    }));
  }

  let usedPackageSlots = 0;
  return photos.map((photo) => {
    const photoCount = getPhotoUnitCount(photo);
    const isSaved = usedPackageSlots + photoCount <= packageLimit;
    usedPackageSlots += photoCount;

    return {
      ...photo,
      section: isSaved ? 'saved' : 'additional',
      paymentStatus: isSaved ? 'paid' : (photo.paymentStatus || 'pending')
    };
  });
};

export const getPaidPhotoIds = (photos = []) => photos
  .filter((photo) => photo.paymentStatus === 'paid')
  .map((photo) => photo.id);

export const hasPackagePricing = (book = {}) =>
  getBookValue(book, 'packagePrice', 'package_price') !== null &&
  getBookValue(book, 'packagePrice', 'package_price') !== undefined;

export const isPrepaidPackage = (book = {}) =>
  money(getBookValue(book, 'packagePrice', 'package_price')) === 0 &&
  Number(getBookValue(book, 'packagePhotos', 'package_photos') || 0) > 0;

export const getPackagePhotoCount = (book = {}) => {
  const count = Number(getBookValue(book, 'packagePhotos', 'package_photos') || 0);
  return Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
};

export const reconcilePaymentSelectedPhotoIds = (selectedPhotoIds = [], photos = []) => {
  const selectedSet = new Set(selectedPhotoIds);
  return photos.filter((photo) => isPayablePhoto(photo) && selectedSet.has(photo.id)).map((photo) => photo.id);
};

export const calculatePerPhotoSelectionPrice = (pricePerPhoto, count, useDiscounts = true) => {
  const unitPrice = money(pricePerPhoto);
  const photoCount = Math.max(Number(count || 0), 0);
  if (photoCount === 0 || unitPrice === 0) return 0;
  if (!useDiscounts) return money(unitPrice * photoCount);

  if (photoCount >= 10) {
    return money((unitPrice * 10 * 0.7) + ((photoCount - 10) * unitPrice));
  }

  if (photoCount >= 5) {
    return money((unitPrice * 5 * 0.8) + ((photoCount - 5) * unitPrice));
  }

  return money(unitPrice * photoCount);
};

export const calculateBookPaymentQuote = (book = {}, selectedPhotoIds = []) => {
  const photos = Array.isArray(book.photos) ? book.photos : [];
  const selectedIds = reconcilePaymentSelectedPhotoIds(selectedPhotoIds, photos);
  const paidIds = getPaidPhotoIds(photos);
  const paidSet = new Set(paidIds);
  const paidSelectedIds = selectedIds.filter((photoId) => paidSet.has(photoId));
  const pendingSelectedIds = selectedIds.filter((photoId) => !paidSet.has(photoId));
  const packageCount = getPackagePhotoCount(book);
  const packagePrice = money(getBookValue(book, 'packagePrice', 'package_price'));
  const extraPhotoPrice = money(getBookValue(book, 'extraPhotoPrice', 'extra_photo_price'));
  const pricePerPhoto = money(getBookValue(book, 'pricePerPhoto', 'price_per_photo') || 30);
  const hasPackage = hasPackagePricing(book);
  const prepaid = isPrepaidPackage(book);
  const selectedCount = getSelectedPhotoUnitCount(selectedIds, photos);
  const paidSelectedCount = getSelectedPhotoUnitCount(paidSelectedIds, photos);
  const pendingSelectedCount = getSelectedPhotoUnitCount(pendingSelectedIds, photos);
  const { packageIds: packageSelectedIds, extraIds: extraSelectedIds } = hasPackage
    ? splitSelectedPhotoIdsByPackage(selectedIds, photos, packageCount)
    : { packageIds: [], extraIds: [] };
  const paidPackageIds = packageSelectedIds.filter((photoId) => paidSet.has(photoId));
  const pendingPackageIds = packageSelectedIds.filter((photoId) => !paidSet.has(photoId));
  const pendingExtraIds = extraSelectedIds.filter((photoId) => !paidSet.has(photoId));
  const extraSelectedCount = getSelectedPhotoUnitCount(extraSelectedIds, photos);
  const pendingExtraCount = getSelectedPhotoUnitCount(pendingExtraIds, photos);
  const packageAlreadyConfirmed =
    book.paymentStatus === 'paid' ||
    book.payment_status === 'paid' ||
    book.paymentStatus === 'partial_paid' ||
    book.payment_status === 'partial_paid' ||
    paidPackageIds.length > 0;

  let amountDueNow = 0;
  let payablePhotoIds = [];
  let paymentStage = 'none';
  let canFinalizeWithoutPayment = false;
  let selectionOnly = selectedIds.length > 0;

  if (selectedIds.length === 0) {
    selectionOnly = false;
  } else if (hasPackage) {
    if (!packageAlreadyConfirmed && !prepaid && pendingPackageIds.length > 0) {
      amountDueNow = packagePrice;
      payablePhotoIds = pendingPackageIds;
      paymentStage = 'package';
      selectionOnly = false;
    } else if (!packageAlreadyConfirmed && prepaid) {
      paymentStage = 'awaiting_package_confirmation';
    } else if (pendingPackageIds.length > 0) {
      payablePhotoIds = pendingPackageIds;
      paymentStage = 'covered_package';
      canFinalizeWithoutPayment = true;
      selectionOnly = false;
    } else if (pendingExtraIds.length > 0) {
      amountDueNow = money(pendingExtraCount * extraPhotoPrice);
      payablePhotoIds = pendingExtraIds;
      paymentStage = 'extras';
      selectionOnly = false;
    }
  } else if (pendingSelectedIds.length > 0) {
    const hasPriorPayment = paidSelectedIds.length > 0 || book.paymentStatus === 'partial_paid' || book.payment_status === 'partial_paid';
    amountDueNow = hasPriorPayment
      ? calculatePerPhotoSelectionPrice(pricePerPhoto, pendingSelectedCount, false)
      : calculatePerPhotoSelectionPrice(pricePerPhoto, selectedCount, true);
    payablePhotoIds = pendingSelectedIds;
    paymentStage = hasPriorPayment ? 'additional_photos' : 'per_photo';
    selectionOnly = false;
  }

  const totalSelectionPrice = selectedIds.length === 0
    ? 0
    : hasPackage
      ? money((prepaid ? 0 : packagePrice) + (extraSelectedCount * extraPhotoPrice))
      : calculatePerPhotoSelectionPrice(pricePerPhoto, selectedCount, true);

  if (pendingSelectedIds.length === 0) {
    selectionOnly = false;
  }

  return {
    selectedIds,
    selectedCount,
    paidSelectedIds,
    paidSelectedCount,
    pendingSelectedIds,
    pendingSelectedCount,
    packageSelectedIds,
    extraSelectedIds,
    pendingPackageIds,
    pendingExtraIds,
    pendingExtraCount,
    amountDueNow: money(amountDueNow),
    totalSelectionPrice,
    payablePhotoIds,
    requiresPayment: money(amountDueNow) > 0,
    canFinalizeWithoutPayment,
    selectionOnly,
    paymentStage,
    packageAlreadyConfirmed
  };
};

export const applyConfirmedPaymentToBook = (book = {}, selectedPhotoIds = [], payablePhotoIds = []) => {
  const photos = Array.isArray(book.photos) ? book.photos : [];
  const selectedIds = reconcilePaymentSelectedPhotoIds(selectedPhotoIds, photos);
  const payableSet = new Set(payablePhotoIds);
  const nextPhotos = photos.map((photo) => (
    payableSet.has(photo.id) ? { ...photo, paymentStatus: 'paid', section: 'saved' } : photo
  ));
  const validPhotos = nextPhotos.filter(isPayablePhoto);
  const allPhotosPaid = validPhotos.length > 0 && validPhotos.every((photo) => photo.paymentStatus === 'paid');
  const hasSomePaid = nextPhotos.some((photo) => photo.paymentStatus === 'paid');
  const paymentStatus = allPhotosPaid ? 'paid' : hasSomePaid ? 'partial_paid' : 'pending';

  return {
    ...book,
    photos: nextPhotos,
    paymentStatus,
    payment_status: paymentStatus,
    selectedPhotoIds: selectedIds,
    selected_photo_ids: selectedIds
  };
};
