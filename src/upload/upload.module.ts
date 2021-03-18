import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [AuthModule, MulterModule.registerAsync({
    useFactory: () => ({
      dest: "/avatarImages"
    })
  })],
  controllers: []
})

export class UtilsModule {
}