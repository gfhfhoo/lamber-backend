import { Module } from "@nestjs/common";
import { CodeController } from "./code.controller";
import { UtilsModule } from "../utils/utils.module";
import { AmqpModule } from "../amqp/amqp.module";
import { ProblemModule } from "../entities/problem/problem.module";
import { CConfigModule } from "../config/config.module";
import { RecordModule } from "../entities/record/record.module";


@Module({
  imports: [UtilsModule, AmqpModule, ProblemModule, CConfigModule, RecordModule],
  controllers: [CodeController],
  providers: []
})

export class CodeModule {
}