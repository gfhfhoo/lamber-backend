import { Module } from "@nestjs/common";
import { IndexModule } from "./index/index.module";
import { CodeModule } from "./code/code.module";
import { UserModule } from "./entities/user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { EventsModule } from "./websocket/events.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { ProblemModule } from "./entities/problem/problem.module";
import { RedisModule } from "./redis/redis.module";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { RoleGuard } from "./role/role.guard";
import { ResponseInterceptor } from "./interceptor/response.interceptor";
import { ScheduleModule } from "@nestjs/schedule";
import { TimingModule } from "./timingTask/timing.module";
import { ConfigModule } from "@nestjs/config";
import { CConfigService } from "./config/config.service";
import { CConfigModule } from "./config/config.module";
import config from "./config/config";

@Module({
  imports: [ConfigModule.forRoot({
    load: [config],
    cache: true,
    isGlobal: true
  }), TypeOrmModule.forRootAsync({
    imports: [CConfigModule],
    useFactory: (cConfigService: CConfigService) => ({
      type: "mysql",
      host: cConfigService.mysqlConf.host,
      port: cConfigService.mysqlConf.port,
      username: cConfigService.mysqlConf.username,
      password: cConfigService.mysqlConf.password,
      database: cConfigService.mysqlConf.database,
      autoLoadEntities: true,
      synchronize: true
    }),
    inject: [CConfigService]
  }), MongooseModule.forRootAsync({
    imports: [CConfigModule],
    useFactory: (cConfigService: CConfigService) => ({
      uri: `mongodb://${cConfigService.mysqlConf.host}/${cConfigService.mysqlConf.database}`
    }),
    inject: [CConfigService]
  }), ScheduleModule.forRoot(), IndexModule, CodeModule, UserModule, EventsModule, ProblemModule, RedisModule, TimingModule],
  providers: [{
    provide: APP_GUARD,
    useClass: RoleGuard
  }, {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor
  }]
})

export class AppModule {
  constructor(private connection: Connection) {
  }
}
