import { Injectable } from "@nestjs/common";
import * as crypto from "crypto-js";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UtilsService {

  constructor(private readonly jwtService: JwtService) {
  }

  async verifyAndGetUserId(token: string): Promise<boolean | number> {
    if (token == "" || token == undefined) return false;
    if (!this.jwtService.verify(token)) return false;
    const a = crypto.enc.Base64.parse(token.split(".")[1]);
    const userId = JSON.parse(a.toString(crypto.enc.Utf8))["sub"];
    return userId as number;
  }

  async nextRecordId(): Promise<string> {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let id = [], i;
    let radix = chars.length;
    for (i = 0; i < 16; ++i) id[i] = chars[0 | Math.random() * radix];
    let array = Date.now().toString().split("");
    let dateLength = array.length;
    for (i = 0; i < dateLength; ++i) id.push(chars[0 | Math.random() * (Number(array[i]))]);
    return id.join("");
  }
}
