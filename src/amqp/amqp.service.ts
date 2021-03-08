import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AmqpService {
  constructor(@Inject("MATH_SERVICE") private readonly client: ClientProxy) {
  }

  sendMessage(pattern: string, msg: any) {
    return this.client.send(pattern, msg).toPromise();
  }
}