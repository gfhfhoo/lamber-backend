import { Injectable, Logger } from "@nestjs/common";
import { Channel, connect, Connection } from "amqplib";
import { CConfigService } from "../config/config.service";
import { EventsGateway } from "../websocket/events.gateway";


@Injectable()
export class AmqpService {
  constructor(private readonly configService: CConfigService,
              private readonly eventGateway: EventsGateway) {
    this.createChannel();
  }

  private logger: Logger = new Logger("AmqpService");
  private amqpChannel: Channel;
  private amqpConfig;
  private connection: Connection;
  private conn = (): Promise<Channel> => {
    this.amqpConfig = this.configService.amqpConf;
    return new Promise(async (resolve, reject) => {
      try {
        this.connection = await connect(`amqp://${this.amqpConfig.username}:${this.amqpConfig.password}@${this.amqpConfig.host}:${this.amqpConfig.port}/${this.amqpConfig.vhost}`);
        const channel = await this.connection.createChannel();
        resolve(channel);
      } catch (err) {
        this.logger.error("We couldn't connect to rabbitMQ!");
      }
    });
  };

  async sendMessage(queue: string, msg: any) {
    this.amqpChannel.assertQueue(queue).then(() => {
      return this.amqpChannel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    });
  }

  async receiveMessage(queue: string, broadcast?: string) {
    await this.amqpChannel.consume(queue, (msg) => {
      if (msg == null) return null;
      this.amqpChannel.ack(msg);
      if (broadcast != null) {
        this.eventGateway.broadcastMessage(JSON.stringify({
          data: msg.content.toString()
        }), broadcast);
      }
    });
  }

  private createChannel() {
    this.conn().then((channel) => {
      this.amqpChannel = channel;
    });
  }
}
