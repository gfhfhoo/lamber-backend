import { Module } from "@nestjs/common";
import { UtilsService } from "./utils.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule],
  providers: [UtilsService],
  exports: [UtilsService]
})

export class UtilsModule {
}