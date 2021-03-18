import { Module } from "@nestjs/common";
import { AmqpService } from "./amqp.service";
import { CConfigModule } from "../config/config.module";

@Module({
  imports: [CConfigModule],
  providers: [AmqpService],
  exports: [AmqpService]
})

export class AmqpModule {
}