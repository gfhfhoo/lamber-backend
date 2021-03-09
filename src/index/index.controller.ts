import { Controller, Get } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";

@Controller()
export class IndexController {
  constructor(private readonly redisService: RedisService) {
  }

  @Get("getNotice")
  async getNotice() {
    return await this.redisService.get("short_notice");
  }

  @Get("getRanking")
  async getRanking() {
    return await this.redisService.get("ranking");
  }

  @Get("getAnno")
  async getAnno() {
    return await this.redisService.get("anno");
  }


}