import { Module } from "@nestjs/common";
import { TasksService } from "./timing.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [ClientsModule.register([
    {
      name: "MATH_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672/vhost_dev"],
        queue: "heart",
        queueOptions: {
          durable: true
        },
        noAck: false
      }
    }
  ])],
  providers: [TasksService]
})
export class TimingModule {

}