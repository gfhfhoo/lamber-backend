import { Controller, Get, Post, Query } from "@nestjs/common";
import * as crypto from "crypto-js";
import { AuthService } from "../../auth/auth.service";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { Role } from "../../role/role.enum";

@Controller()
export class UserController {
  constructor(private readonly authService: AuthService,
              private readonly userService: UserService) {
  }

  @Post("login")
  async loginVerify(@Query("username") username: string,
                    @Query("password") password: string) {
    password = crypto.MD5(password).toString();
    return this.authService.login(new User(username, password));
  }

  @Post("register")
  async registerUser(@Query("username") username: string,
                     @Query("password") password: string) {
    // Alert: the param password is encrypted.
    // But now, I have to encrypt it myself.
    password = crypto.MD5(password).toString();
    return this.userService.register(username, password);
  }

  @Get("AuthChange")
  async authChange(@Query("userId") userId: string,
                   @Query("newRole") role: string) {
    return Role[role] === role ? this.userService.updateById(userId, { role: role }) : undefined;
  }
}