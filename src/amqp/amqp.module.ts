import { Module } from "@nestjs/common";
import { AmqpService } from "./amqp.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [ClientsModule.register([
    {
      name: "MATH_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672/vhost_dev"],
        queue: "task",
        queueOptions: {
          durable: true
        }
      }
    }
  ])],
  providers: [AmqpService],
  exports: [AmqpService]
})

export class AmqpModule {
}