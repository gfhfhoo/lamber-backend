import { Injectable, Logger } from "@nestjs/common";
import { Channel, connect } from "amqplib";
import { CConfigService } from "../config/config.service";


@Injectable()
export class AmqpService {
  constructor(private readonly configService: CConfigService) {
    this.createChannel();
  }

  private logger: Logger = new Logger("AmqpService");
  private amqpChannel: Channel;
  private amqpConfig;
  private conn = (): Promise<Channel> => {
    this.amqpConfig = this.configService.amqpConf;
    return new Promise(async (resolve, reject) => {
      try {
        const connection = await connect(`amqp://${this.amqpConfig.username}:${this.amqpConfig.password}@${this.amqpConfig.host}:${this.amqpConfig.port}/${this.amqpConfig.vhost}`);
        const channel = await connection.createChannel();
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

  private createChannel() {
    this.conn().then((channel) => {
      this.amqpChannel = channel;
    });
  }
}
