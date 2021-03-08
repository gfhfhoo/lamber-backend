import { Module } from "@nestjs/common";
import { IndexController } from "./index.controller";
import { AmqpModule } from "../amqp/amqp.module";
import { UtilsModule } from "../utils/utils.module";
import { RedisModule } from "../redis/redis.module";


@Module({
  imports: [AmqpModule, UtilsModule, RedisModule],
  controllers: [IndexController],
  providers: []
})

export class IndexModule {
}