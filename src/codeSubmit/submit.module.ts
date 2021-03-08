import { Module } from "@nestjs/common";
import { SubmitController } from "./submit.controller";

@Module({
  imports: [],
  controllers: [SubmitController],
  providers: []
})

export class SubmitModule {
}