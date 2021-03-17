import { Module } from "@nestjs/common";
import { CodeController } from "./code.controller";
import { UtilsModule } from "../utils/utils.module";
import { AmqpModule } from "../amqp/amqp.module";
import { ProblemModule } from "../entities/problem/problem.module";

@Module({
  imports: [UtilsModule, AmqpModule, ProblemModule],
  controllers: [CodeController],
  providers: []
})

export class CodeModule {
}