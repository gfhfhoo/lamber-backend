import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../role/role.decorator";
import { Role } from "../role/role.enum";

@Controller()
export class BackendController {
  constructor(private readonly manager: RedisService) {
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post("publish_short_notice")
  async publishNotice(@Query("expire") ttl: number,
                      @Body() body: object) {
    await this.manager.set("short_notice", body["data"]);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post("publish_anno")
  async publishAnno(@Query("expire") ttl: number,
                    @Body() body: object) {
    await this.manager.set("anno", body["data"]);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get("getOverview")
  async getOverview() {
    return "";
  }


}