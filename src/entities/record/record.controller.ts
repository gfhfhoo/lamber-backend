import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { Role } from "../../role/role.enum";
import { Roles } from "../../role/role.decorator";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { RecordService } from "./record.service";
import { Record } from "./schemas/record.schema";

@Controller()
export class RecordController {
  constructor(private readonly recordService: RecordService) {
  }

  @Get("getRecords")
  async getRecords(@Query("page") page: number = 1) {
    return this.recordService.getRecords(page);
  }

  @Get("getRecord/:id")
  async getRecord(@Param() param) {
    return this.recordService.getSingleRecord(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post("addRecords")
  async addRecords(@Body() body: object) {
    return this.recordService.insert(new Record(body));
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post("updateRecords")
  async updateRecords(@Body() body: object) {
    return this.recordService.update(new Record(body));
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post("deleteRecord")
  async deleteRecord(@Query("recordId") id: number) {
    return this.recordService.delete(id);
  }
}