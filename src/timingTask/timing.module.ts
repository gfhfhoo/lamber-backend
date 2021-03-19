import { Module } from "@nestjs/common";
import { TasksService } from "./timing.service";
import { AmqpModule } from "../amqp/amqp.module";
import { CConfigModule } from "../config/config.module";
import { EventsModule } from "../websocket/events.module";

@Module({
  imports: [AmqpModule, CConfigModule],
  providers: [TasksService]
})
export class TimingModule {

}