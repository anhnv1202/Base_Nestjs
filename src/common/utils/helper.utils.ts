/* eslint-disable @typescript-eslint/no-unused-vars */
import { QUERY_PARAM_PARSE } from '@common/constants/global.const';
import { Pagination } from '@common/interfaces/filter.interface';
import { User } from '@models/user.model';
import { Job } from 'bull';
import * as fs from 'fs';
import * as i18n from 'i18n';
import * as path from 'path';
import { extname } from 'path';
import LogService from 'src/config/log.service';
import { DEFAULT_PAGINATION } from './../constants/global.const';

export function handleLogError(error: any) {
  if (process.env.NODE_ENV !== 'development') {
    let logStr = '';
    const { stack, ...rest } = error;

    logStr += `${JSON.stringify(rest, null, 4)}\n`;
    if (stack) {
      logStr += `Stack Trace:\n${stack}\n`;
    }
    LogService.logErrorFile(logStr);
  } else {
    LogService.logError('STACK', error.stack);
    LogService.logError('PATH', error.path);
    LogService.logError('BODY REQUEST', JSON.stringify(error?.body)?.slice(0, 500) + '...');
    LogService.logError(JSON.stringify(error));
  }
}

export function handleLogInfo(info: any) {
  if (process.env.NODE_ENV !== 'development') {
    LogService.logInfoFile(info);
  } else {
    LogService.logInfo(info);
  }
}

export const maskKey = (key: string, show: number) =>
  key ? `${key.slice(0, show)}${'*'.repeat(Math.max(0, key.length - show))}` : '';

export function replaceTemplateStrings(template: string, values: Record<string, string>): string {
  return Object.keys(values).reduce((acc, key) => {
    try {
      const regex = new RegExp(`{{${key}}}`, 'g');
      return acc.replace(regex, values[key]);
    } catch (error) {
      return acc;
    }
  }, template);
}

export function convertQueryParam(query: any): { [key: string]: string } {
  const parseQueries = {};

  Object.keys(query).forEach((key) => {
    if (['', 'undefined', 'NaN', 'null'].includes(query[key])) return;

    const array = (query[key] as string).split(',');

    if (array.length > 1) {
      parseQueries[key] = array;
      return;
    }

    parseQueries[key] = QUERY_PARAM_PARSE[query[key]] ?? query[key];
  });

  return parseQueries;
}
export function getPagination(request: { query: unknown }): Pagination {
  const query = convertQueryParam(request.query);
  const paginationParams = {
    ...DEFAULT_PAGINATION,
    ...query,
  } as Pagination;
  return paginationParams;
}

export function findKeyMap(map: Map<string, any>, value: any): string | null {
  let key;
  map.forEach((mValue, mKey) => {
    if (mValue === value) {
      key = mKey;
      return;
    }
  });

  return key;
}

export const generateSupportMail = (domain: string) => {
  return `support@${domain}`;
};

export const gennerateZerosslUrl = (zerosslKey: string, url: string) => {
  return `${url}?access_key=${zerosslKey}`;
};

export const gennerateSearchZerosslUrl = (zeroUrl: string, domain: string) => {
  return `${zeroUrl}?search=${domain}`;
};

export const ItemNotFoundMessage = (item: string) => i18n.__('item-not-found', i18n.__(item));

export const AlreadyExistMessage = (item: string) => i18n.__('item-existed', i18n.__(item));
export const HasBeenUsedMessage = (item: string) => i18n.__('has-been-used', i18n.__(item));

export const getManagerId = (user: User, userId: string) => {
  return user.adminId ? user.adminId.toString() : userId;
};

export async function onGetFromCache(key: string) {
  const cachedResponse = await this.cacheService.get({ key: key });
  if (cachedResponse) {
    return JSON.parse(cachedResponse);
  }
}

export const isValidDomain = (domain: string) => {
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,}$/;

  return domainRegex.test(domain);
};

export const generateRandomSixDigitString = () => {
  const randomNumber = Math.floor(Math.random() * 1000000);

  return randomNumber.toString().padStart(6, '0');
};

export const generateFileName = (imageUrl: string) => {
  return imageUrl.split('/').pop();
};

export const generateSKU = () => {
  return `${new Date().valueOf()}-${generateRandomSixDigitString()}`;
};

export const generateBasicAuthToken = (publicKey: string, secretKey: string) => {
  return `Basic ${Buffer.from(`${publicKey}:${secretKey}`).toString('base64')}`;
};

export const getExtensionByPath = (path: string) => extname(path).toLowerCase();

export const camelize = (str: string): string => {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
};

export function removeFileFromName(directory: string, fileName: string) {
  fs.readdir(directory, (err, files) => {
    if (err) handleLogError(err);
    for (const file of files) {
      if (file.includes(fileName)) {
        fs.unlink(path.join(directory, file), () => {});
      }
    }
  });
}
export const roundTwoDigit = (number: number) => {
  return Math.round(number * 100) / 100;
};
export const handleLogErrorQueue = (job: Job<any>, error: any) => {
  const exceptionContent = {
    errors: `Failed job ${job.id} of type ${job.name}: ${error}`,
    body: job.data,
    stack: error.stack,
    success: false,
  };
  handleLogError(exceptionContent);
};
