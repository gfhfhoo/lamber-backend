import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UtilsService } from "../utils/utils.service";
import { AmqpService } from "../amqp/amqp.service";
import { ProblemService } from "../entities/problem/problem.service";


@Controller()
export class CodeController {
  constructor(private readonly utils: UtilsService,
              private readonly amqp: AmqpService,
              private readonly problemService: ProblemService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post("submit")
  async submitCode(@Query("problemId") problemId: number,
                   @Body() body: object,
                   @Req() req) {
    const userId = await this.utils.verifyAndGetUserId(req.headers["authorization"]);
    const isExistProblem = await this.problemService.getSingleProblem(problemId);
    if (userId === false) return new UnauthorizedException();
    if (isExistProblem == null) return new BadRequestException();
    const sendBody = {
      recordId: await this.utils.nextRecordId(),
      userId: userId,
      problemId: problemId,
      lang: body["lang"],
      code: body["code"]
    };
    await this.amqp.sendMessage("task", sendBody);
    return "success";
  }
}