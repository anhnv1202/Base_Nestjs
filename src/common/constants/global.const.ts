export enum Roles {
  master = 0,
  admin = 1,
  seller = 2,
}

export enum ADMIN_PERMISSION {
  FINANCIAL = 'FINANCIAL',
  AM = 'AM',
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
  GATEWAY = 'GATEWAY',
  PROCUREMENT = 'PROCUREMENT',
  PRODUCT = 'PRODUCT',
}
export const ADMIN_PERMISSION_SCOPES = ['FINANCIAL', 'AM', 'CUSTOMER_SUPPORT', 'GATEWAY', 'PROCUREMENT', 'PRODUCT'];

export enum ResponseType {
  Ok,
  Created,
}

export enum Encoding {
  SJIS = 'Shift_JIS',
  UTF8 = 'utf8',
}

export enum Locales {
  VI = 'vi',
  EN = 'en',
  JA = 'ja',
  KR = 'kr',
}

export const APP_LOCALES = [Locales.EN];

export const DEFAULT_PAGINATION = {
  size: 25,
  page: 1,
};

export const QUERY_PARAM_PARSE = {
  false: false,
  true: true,
};

export enum ErrorMessage {
  UNIQUE = 'duplicate key error collection',
  QUERY_WRONG = 'Make sure your query is correct.',
  DATE_TIME_INVALID = 'date/time field value out of range',
  FAILING_ROW = 'Failing row contains',
  IS_CLOUDFLARE = 'https://developers.cloudflare.com',
}
export const EXPIRES_IN = {
  ACCESS_TOKEN: 60 * 60 * 24 * 2,
  REFRESH_TOKEN: 60 * 60 * 24 * 365,
  SENDGRID: 30 * 60,
  CONFIRM_TOKEN: 30 * 60,
  POLICY_CACHE: 24 * 60 * 60,
  LIST_PAYMENT_CACHE: 30 * 60,
  SKSTRIPE_CACHE: 24 * 60 * 60,
  ORDER_PREFIX_CACHE: 60 * 60,
  VERIFY_2FA_PAYMENT_CACHE: 10 * 60,
};

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  CONFIRM_TOKEN = 'confirm_token',
}

export const SYSTEM_NAME = {
  MIXED: 'OpenSite',
  LOWERCASE: 'opensite',
  UPPERCASE: 'OPENSITE',
};

export const EMAIL_FROM = `support@${SYSTEM_NAME.LOWERCASE}x.store`;

export enum KeyRedisEnum {
  timezone = 'timezone',
  listUtm = 'listutm',
  sendgrid = 'sendgrid',
  listDomain = 'listdomain',
  listPayment = 'listpayment',
  policy = 'policy',
  skstripe = 'skstripe',
  orderprefix = 'orderprefix',
  listUtmTraffic = 'listutmtraffic',
  listStoreTraffic = 'liststore',
  verify2faPayment = 'verify2fapayment',
}

export const STRING_TIMEZONE = {
  '-1': 'Atlantic/Cape_Verde',
  '-7': 'US/Arizona',
  '-9': 'America/Anchorage',
  '-8': 'America/Chicago',
  '+0': 'Africa/Monrovia',
  '+7': 'Asia/Ho_Chi_Minh',
  '+8': 'Asia/Singapore',
};

export const generateRedisKey = (key: KeyRedisEnum, value: string): string => {
  return `${key}-${value}`;
};

export const DEFAULT_PASSWORD = 'cuocdoivandepsao@123';

export const SORT_DIRECTION = ['asc', 'desc'];

export const SEARCH_BY = {
  ALL_ADMIN: ['email', 'name'],
  ALL_SELLER: ['email', 'name', 'supportEmail'],
  ALL_DOMAIN: ['domain'],
  ALL_PRODUCT: ['supportEmail', 'title'],
  SELLER_ORDER: ['orderCode', 'domain'],
};

export const REGEX = {
  DOMAIN: /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(?:\.[a-zA-Z]{2,})+$/,
};

export const MAIL_TEMPLATE = {
  FORGOT_PASSWORD: './forgot-password.template.hbs',
  REGISTER: './registration.template.hbs',
  CONFIRM_ORDER: './orderConfirm.template.hbs',
  TRACKING_ORDER: './orderTracking.template.hbs',
};
