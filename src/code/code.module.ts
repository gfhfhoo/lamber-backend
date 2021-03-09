import { Module } from "@nestjs/common";
import { CodeController } from "./code.controller";
import { UtilsModule } from "../utils/utils.module";
import { AmqpModule } from "../amqp/amqp.module";

@Module({
  imports: [UtilsModule, AmqpModule],
  controllers: [CodeController],
  providers: []
})

export class CodeModule {
}