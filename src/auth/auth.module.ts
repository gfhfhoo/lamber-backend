import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../entities/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constant";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [forwardRef(() => UserModule), PassportModule
    , JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: "3d"
      }
    })],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService]
})
export class AuthModule {
}
