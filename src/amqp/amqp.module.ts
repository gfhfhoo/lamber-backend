import { Module } from "@nestjs/common";
import { AmqpService } from "./amqp.service";
import { CConfigModule } from "../config/config.module";
import { EventsModule } from "../websocket/events.module";

@Module({
  imports: [CConfigModule, EventsModule],
  providers: [AmqpService],
  exports: [AmqpService]
})

export class AmqpModule {
}