import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface MysqlConfig {
  host: string
  port: number
  username: string
  password: string
  database: string
}

interface MongoConfig {
  host: string
  database: string
}

interface RedisConfig {
  host: string
  port: number
}

interface AmqpConfig {
  host: string
  port: number
  username: string
  password: string
  vhost: string
  queue: {
    heartbeat: string
    task: string
  }
}

@Injectable()
export class CConfigService {
  public mysqlConf: MysqlConfig;
  public mongoConf: MongoConfig;
  public redisConf: RedisConfig;
  public amqpConf: AmqpConfig;

  constructor(private readonly configService: ConfigService) {
    this.mysqlConf = this.configService.get<MysqlConfig>("mysql");
    this.mongoConf = this.configService.get<MongoConfig>("mongodb");
    this.redisConf = this.configService.get<RedisConfig>("redis");
    this.amqpConf = this.configService.get<AmqpConfig>("amqp");
  }
}