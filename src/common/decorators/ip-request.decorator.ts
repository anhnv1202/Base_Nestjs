import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RealIP = createParamDecorator((_, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();

  const xForwardedFor = request.headers['x-forwarded-for'];
  if (xForwardedFor) {
    const clientIps = xForwardedFor.split(',').map((ip: string) => ip.trim());
    return clientIps[0];
  }

  return request.headers['x-real-ip'] || request.connection.remoteAddress;
});
