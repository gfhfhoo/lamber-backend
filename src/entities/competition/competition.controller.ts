import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { Role } from "../../role/role.enum";
import { Roles } from "../../role/role.decorator";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CompetitionService } from "./competition.service";
import { Competition } from "./schemas/competition.schema";

@Controller()
export class CompetitionController {
  constructor(private readonly compService: CompetitionService) {
  }

  @Get("getCompetitions")
  async getCompetitions(@Query("page") page: number = 1) {
    return this.compService.getCompetitions(page);
  }

  @Get("getCompetition/:id")
  async getCompetition(@Param() param) {
    return this.compService.getSingleCompetition(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post("addCompetitions")
  async addProblems(@Body() body: object) {
    return this.compService.insert(<Competition>body);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post("updateCompetitions")
  async updateProblems(@Body() body: object) {
    return this.compService.update(<Competition>body);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post("deleteCompetition")
  async deleteProblem(@Query("problemId") id: number) {
    return this.compService.delete(id);
  }
}