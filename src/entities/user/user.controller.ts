import { Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import * as crypto from "crypto-js";
import { AuthService } from "../../auth/auth.service";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { Role } from "../../role/role.enum";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { Roles } from "../../role/role.decorator";

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

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get("GetUsers")
  async getAllUsers(@Query("page") page: number) {
    const res = await this.userService.findAll();
    return {
      data: res[0],
      count: res[1]
    };
  }
}