export const QUEUE = {
  mailQueue: 'MAIL_QUEUE',
  sendgrid: 'SENDGRID',
  paymentQueue: 'PAYMENT_QUEUE',
  sendAbandoned: 'SEND_ABANDONED',
  view: 'VIEW',
  botTelegram: 'BOT_TELEGRAM',
  file: 'FILE_QUEUE',
};

export const CONFIRM_REGISTRATION = 'CONFIRM_REGISTRATION';
export const CONFIRM_FORGOT_PASSWORD = 'CONFIRM_FORGOT_PASSWORD';
export const CONFIRM_ORDER = 'CONFIRM_ORDER';
export const TRACKING_ORDER = 'TRACKING_ORDER';
export const CREATE_ABANDON = 'CREATE_ABANDON';
export const SEND_ABANDON_EMAIL = 'SEND_ABANDON_EMAIL';
export const COUNT_VIEW = 'COUNT_VIEW';
export const COUNT_ADD_TO_CART = 'COUNT_ADD_TO_CART';
export const COUNT_INITIATE_CHECKOUT = 'COUNT_INITIATE_CHECKOUT';
export const UPLOAD_FILE_S3 = 'UPLOAD_FILE_S3';

export const PAYMENT_QUEUE = {
  removeCachePolicy: 'REMOVE_CACHE_POLICY',
};

export const TELEGRAM_BOT_QUEUE = {
  sendNotifyOrder: 'SEND_NOTIFY_ORDER',
};

export const defaultJobOptions = {
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
  removeOnComplete: true,
  removeOnFail: {
    age: 604800,
    count: 10,
  },
};
