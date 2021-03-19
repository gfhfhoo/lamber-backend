import {
  BadRequestException,
  Body,
  Controller,
  Logger,
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
import { CConfigService } from "../config/config.service";
import { RecordService } from "../entities/record/record.service";
import { Record } from "../entities/record/schemas/record.schema";


@Controller()
export class CodeController {
  private readonly logger = new Logger(CodeController.name);

  constructor(private readonly utils: UtilsService,
              private readonly amqp: AmqpService,
              private readonly problemService: ProblemService,
              private readonly recordService: RecordService,
              private readonly cConfigService: CConfigService) {
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
    const id = await this.utils.nextRecordId();
    const sendBody = {
      recordId: id,
      userId: userId,
      problemId: problemId,
      lang: body["lang"],
      code: body["code"]
    };
    return this.amqp.sendMessage(this.cConfigService.amqpConf.queue.task, sendBody).then(async () => {
      await this.recordService.insert(new Record({
        submitterId: sendBody.userId,
        lang: sendBody.lang,
        codeBody: sendBody.code,
        recordHash: sendBody.recordId
      }));
      return "success";
    }).catch(() => {
      this.logger.error(`Encountered Fatal Error! Queue task had no response at ${Date.now().toString()}`);
      throw new BadRequestException();
    });
  }
}