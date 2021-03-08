import { Module } from "@nestjs/common";
import { IndexModule } from "./index/index.module";
import { SubmitModule } from "./codeSubmit/submit.module";
import { UserModule } from "./entities/user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { EventsModule } from "./websocket/events.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { ProblemModule } from "./entities/problem/problem.module";
import { RedisModule } from "./redis/redis.module";
import { APP_GUARD } from "@nestjs/core";
import { RoleGuard } from "./role/role.guard";


@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "lamber",
      autoLoadEntities: true,
      synchronize: true
    })
  }), MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: "mongodb://127.0.0.1/lamber"
    })
  }),
    IndexModule, SubmitModule, UserModule, EventsModule, ProblemModule, RedisModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RoleGuard
  }]
})
export class AppModule {
  constructor(private connection: Connection) {
  }
}
