import { Injectable, Logger } from "@nestjs/common";
import { Interval, Timeout } from "@nestjs/schedule";
import { AmqpService } from "../amqp/amqp.service";
import { CConfigService } from "../config/config.service";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly amqp: AmqpService,
              private readonly cConfigService: CConfigService) {
  }

  @Interval(5000)
  async handleInterval() {
    return;
    this.logger.log("Sending heartbeat...");
    await this.amqp.sendMessage(this.cConfigService.amqpConf.queue.heartbeat, {
      timeStamp: Date.now()
    });
  }

  @Timeout(0)
  handleTaskFallback() {
    this.amqp.receiveMessage("task_fallback", "message").then(() => {
      this.logger.log("TaskFallback queue is monitoring...");
    });
  }
}