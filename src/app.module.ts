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


@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "200108220zws",
      database: "lamber",
      autoLoadEntities: true,
      synchronize: true
    })
  }), MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: "mongodb://127.0.0.1/lamber"
    })
  }),
    IndexModule, CodeModule, UserModule, EventsModule, ProblemModule, RedisModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RoleGuard
  },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }]
})
export class AppModule {
  constructor(private connection: Connection) {
  }
}
