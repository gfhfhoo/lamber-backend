import { Module } from "@nestjs/common";
import { TasksService } from "./timing.service";
import { AmqpModule } from "../amqp/amqp.module";

@Module({
  imports: [AmqpModule],
  providers: [TasksService]
})
export class TimingModule {

}