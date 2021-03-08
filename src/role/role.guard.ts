import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./role.decorator";
import { Role } from "./role.enum";
import * as crypto from "crypto-js";
import { UserService } from "../entities/user/user.service";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector,
              private userService: UserService) {
  }

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!required) return true;
    const token = context.switchToHttp().getRequest().headers["authorization"];
    if (token === undefined) return false;
    const a = crypto.enc.Base64.parse(token.split(".")[1]);
    const gotRole = JSON.parse(a.toString(crypto.enc.Utf8))["role"];
    return required.some((role) => gotRole === role);
  }

}