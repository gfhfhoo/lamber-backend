import { Module } from "@nestjs/common";
import { CConfigService } from "./config.service";

@Module({
  providers: [CConfigService],
  exports: [CConfigService]
})
export class CConfigModule {

}