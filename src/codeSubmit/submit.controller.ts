import { Body, Controller, Post, Query } from "@nestjs/common";


@Controller()
export class SubmitController {
  constructor() {
  }

  @Post("submit")
  submitCode(@Query("userid") userId: number,
             @Query("problemid") problemId: number,
             @Body() codeBody: object) {
    console.log(codeBody["value"]);
  }
}