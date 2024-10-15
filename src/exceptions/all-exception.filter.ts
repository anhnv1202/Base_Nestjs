/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorMessage } from '@common/constants/global.const';
import { handleLogError } from '@common/utils/helper.utils';
import { getUserTokenByRequest } from '@guards/guard.helper';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as i18n from 'i18n';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception.status
          ? exception.status
          : HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[];

    try {
      message = exception?.status ? exception.getResponse().message : exception.message;
    } catch (err) {
      message = exception?.errors?.length
        ? exception.errors[0]?.error_chain
          ? exception.errors[0]?.error_chain.map((item: any) => item.message).join(',')
          : exception?.errors
              .map((item: any) => {
                const index = item?.message?.indexOf('For more details,');
                if (index != -1) {
                  return item.message.substring(0, index - 1);
                }
                return item.message;
              })
              .join(',')
        : exception.message;
    }

    const error = exception?.status
      ? typeof exception?.getResponse === 'function'
        ? exception?.getResponse()
        : ''
      : '';

    const exceptionContent = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      success: false,
      errors: getErrorMessage(message, JSON.stringify(error || {})),
      body: request.body,
      method: request.method,
      query: request.query,
      params: request.params,
    };
    const metadata = {
      ip: request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || request.ip,
      userAgent: request.headers['user-agent'],
      cfIpCountry: request.headers['cf-ipcountry'],
      origin: request.headers['origin'],
      referer: request.headers['referer'],
      user: getUserTokenByRequest(request) || 'anonymous',
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleLogError({ ...exceptionContent, ...metadata, stack: exception?.stack });
    response.status(status).json(exceptionContent);
  }
}

function getErrorMessage(error: string | string[], key: string): string {
  if (!error?.length) return i18n.__('internal-server-error');

  const sub = key && !key?.includes(' ') ? i18n.__(key) : 'Query';

  if (Array.isArray(error)) {
    return getErrorMessage((error || [])[0], null);
  }

  if (error.includes(ErrorMessage.UNIQUE)) {
    const key = error.split('"')[1] ?? error.match(/(\w+)\s*:\s*null/)?.[1] ?? error.match(/(\w+)\s*:\s*ObjectId/)?.[1];
    if (key) {
      return i18n.__('update-check-same-property', i18n.__(key));
    }
  }

  if (error.includes(ErrorMessage.QUERY_WRONG)) {
    return i18n.__('query-invalid', sub);
  }

  if (error.includes(ErrorMessage.DATE_TIME_INVALID)) {
    return i18n.__('query-invalid', sub);
  }
  return i18n.__(error);
}
