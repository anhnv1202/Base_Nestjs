import { IPopulate } from 'src/base/base.repository';
export type DummyPopulate = { [key: string]: IPopulate[] };
export const PAYMENT_POPULATE: DummyPopulate = {
  common: ['policy'],
};

export const STORE_POPULATE: DummyPopulate = {
  findStoreBuyer: [{ path: 'domainId' }],
};

export const STORE_PAYMENT_POPULATE: DummyPopulate = {
  findListStorePaymentBuyer: [{ path: 'sellerPaymentId', populate: { path: 'paymentId', select: '-secretKey -__v' } }],
  getPaypalStorePolicy: [
    {
      path: 'sellerPaymentId',
      populate: {
        path: 'paymentId',
        select: 'active type policyId',
        populate: 'policy',
      },
    },
    { path: 'storeId', select: 'email storeName' },
  ],
  getSecretKeyStripeStore: [
    {
      path: 'sellerPaymentId',
      populate: { path: 'paymentId', select: 'secretKey' },
    },
  ],
};

export const USER_PAYMENT_POPULATE: DummyPopulate = {
  getListSellerPayment: [
    { path: 'sellerId', select: '-password' },
    { path: 'paymentId', select: 'type' },
  ],
};

export const ORDER_POPULATE: DummyPopulate = {
  downloadAll: ['order', 'image', 'storeProduct', 'storeProductVariant', 'seller'],
  sellerExportOrder: ['utm'],
};
