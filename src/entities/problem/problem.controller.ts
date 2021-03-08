import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ProblemService } from "./problem.service";
import { Problem } from "./schemas/problem.schmea";
import { Role } from "../../role/role.enum";
import { Roles } from "../../role/role.decorator";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";

@Controller()
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {
  }

  @Get("getProblems")
  async getProblems(@Query("page") page: number = 1) {
    return this.problemService.getProblems(page);
  }

  @Get("getProblem/:id")
  async getProblem(@Param() param) {
    return this.problemService.getSingleProblem(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post("addProblems")
  async addProblems(@Body() body: object) {
    return this.problemService.insert(new Problem(body));
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post("updateProblems")
  async updateProblems(@Body() body: object) {
    return this.problemService.update(new Problem(body));
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post("deleteProblem")
  async deleteProblem(@Query("problemId") id: number) {
    return this.problemService.delete(id);
  }
}