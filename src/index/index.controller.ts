import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RedisService } from "../redis/redis.service";
import { StandardizeRes } from "../decorator/warpper.decorator";

@StandardizeRes
@Controller()
export class IndexController {
  constructor(private readonly redisService: RedisService) {
  }

  @Get("getNotice")
  async getNotice() {
    return await this.redisService.get("anno")
  }

  @UseGuards(JwtAuthGuard)
  @Get("gets")
  getNotice1() {
    return 'okkk'
  }

}