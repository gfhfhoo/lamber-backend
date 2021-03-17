import { Inject, Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(@Inject("MATH_SERVICE") private readonly client: ClientProxy) {
  }

  sendMessage(pattern: string, msg: any) {
    return this.client.send(pattern, msg).toPromise();
  }

  @Interval(5000)
  async handleInterval() {
    this.logger.log("Sending heartbeat...");
    await this.sendMessage("heart", {
      timeStamp: Date.now()
    })
  }
}