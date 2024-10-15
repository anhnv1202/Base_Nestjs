import { ADMIN_PERMISSION, Roles } from '@common/constants/global.const';

export interface JwtPayload {
  userId: string;
  tokenType?: string;
  role?: Roles;
  iat?: Date;
  sessionId?: string;
}

export interface IToken {
  token: string;
  userId: string;
  sessionId: string;
}

export class JwtTokenDecrypted {
  userId: string;
  role: Roles;
  sessionId?: string;
  permissions?: ADMIN_PERMISSION[];
}
