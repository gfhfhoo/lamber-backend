import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly manager: Cache) {
  }

  async get(key) {
    return await this.manager.get(key);
  }

  async set(key, val, ttl: number = 60) {
    await this.manager.set(key, val, {
      ttl: ttl
    });
  }
}