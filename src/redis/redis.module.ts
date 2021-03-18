import { CacheModule, Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { CConfigService } from "../config/config.service";
import * as redisStore from "cache-manager-redis-store";
import { CConfigModule } from "../config/config.module";

@Module({
  imports: [CacheModule.registerAsync({
    imports: [CConfigModule],
    useFactory: (cConfigService: CConfigService) => ({
      store: redisStore,
      host: cConfigService.redisConf.host,
      port: cConfigService.redisConf.port
    }),
    inject: [CConfigService]
  })],
  providers: [RedisService],
  exports: [RedisService, CacheModule]
})
export class RedisModule {
}
