import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Role } from "../../role/role.enum";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  async findAll() {
    // to do
    // we need pagination
    return this.userRepository.findAndCount();
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username: username
      }
    });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        userId: id
      }
    });
  }

  async register(username: string, password: string, role: Role = Role.User) {
    return this.findOneByUsername(username).then(r => {
      return r === undefined ? this.userRepository.insert(new User(username, password, role)) : undefined;
    });
  }

  async updateById(id: string, fields: object) {
    const user = await this.findOneById(id);
    return await this.userRepository.update(user, fields);
  }

  async updateByUsername(username: string, fields: object) {
    const user = await this.findOneByUsername(username);
    return await this.userRepository.update(user, fields);
  }
}