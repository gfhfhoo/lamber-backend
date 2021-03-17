import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../role/role.enum";

@Entity()
export class User {
  constructor(username: string, password: string, role: Role = Role.User) {
    this.username = username;
    this.password = password;
    this.role = role;
  }

  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @Column()
  avatarImageId: string;
}