import { KeyRedisEnum, TokenType } from '@common/constants/global.const';
import { JwtPayload } from '@common/interfaces/auth.interface';
import { CacheService } from '@modules/cache/cache.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private cacheService: CacheService,
  ) {}

  private secret = this.configService.get<string>('JWT_SECRET_KEY');

  async getAccessTokenFromRedis(payload: JwtPayload): Promise<string> {
    const { userId, sessionId } = payload;
    const key = `${TokenType.ACCESS_TOKEN}-${userId}-${sessionId}`;
    return this.cacheService.get({ key });
  }

  async getSessionPaymentScreenFromRedis(payload: JwtPayload): Promise<boolean | null> {
    const { userId, sessionId } = payload;
    const key = `${KeyRedisEnum.verify2faPayment}-${userId}-${sessionId}`;
    return this.cacheService.get({ key });
  }
}
