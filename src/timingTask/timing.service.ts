import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { AmqpService } from "../amqp/amqp.service";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly amqp: AmqpService) {
  }

  @Interval(5000)
  async handleInterval() {
    this.logger.log("Sending heartbeat...");
    await this.amqp.sendMessage("heart", {
      timeStamp: Date.now()
    });
  }
}