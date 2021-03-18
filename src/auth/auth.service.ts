import { Injectable } from "@nestjs/common";
import { UserService } from "../entities/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../entities/user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
  }

  async login(user: User) {
    // Alert: the password has been encrypted.
    const r = await this.userService.findOneByUsername(user.username);
    if (r instanceof User && r.password != user.password) return undefined;
    const payload = { username: r.username, role: r.role, sub: r.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}