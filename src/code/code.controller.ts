import { Body, Controller, Post, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UtilsService } from "../utils/utils.service";
import { AmqpService } from "../amqp/amqp.service";


@Controller()
export class CodeController {
  constructor(private readonly utils: UtilsService,
              private readonly amqp: AmqpService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post("submit")
  async submitCode(@Query("problemid") problemId: number,
                   @Body() body: object,
                   @Req() req) {
    const userId = await this.utils.verifyAndGetUserId(req.headers["authorization"]);
    if (userId === false) throw new UnauthorizedException();
    const sendBody = {
      recordId: await this.utils.nextRecordId(),
      userId: userId,
      problemId: problemId,
      data: body
    };
    return await this.amqp.sendMessage("task", sendBody);
  }
}