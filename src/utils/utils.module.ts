import { Module } from "@nestjs/common";
import { UtilsService } from "./utils.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  providers: [UtilsService],
  exports: [UtilsService]
})

export class UtilsModule {
}