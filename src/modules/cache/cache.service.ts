import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get({ key }): Promise<any> {
    return this.cacheManager.get(key);
  }

  async set({ key, value, expiresIn }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.cacheManager.set(key, value, { ttl: expiresIn });
  }

  async setNoExpires({ key, value }) {
    return this.cacheManager.set(key, value);
  }

  remove({ key }): Promise<any> {
    return this.cacheManager.del(key);
  }

  removeMany({ key }) {
    return this.cacheManager.store.mdel(key);
  }
}
