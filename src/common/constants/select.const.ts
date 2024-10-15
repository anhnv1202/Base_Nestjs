export type DummySelect = { [key: string]: string };
export const PAYMENT_SELECT: DummySelect = {
  getAllPayment: '-publicKey -secretKey -webhookKey',
};

export const USER_PAYMENT_SELECT: DummySelect = {
  getListSellerPayment: 'createdAt sellerId _id paymentId active',
};
