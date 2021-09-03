import { ApiTags } from "@nestjs/swagger";
import { UserEntity } from "../../auth/entities/user.entity";
import { Role } from "../../role/entities/role.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ApiTags("UserRole")
@Entity({ name: "userrole" })
export class UserRole {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.userId)
  @JoinColumn({ name: "userId" })
  userId: UserEntity;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: "roleId" })
  roleId: Role;

  @Column({ default: "yes", length: 5 })
  isDefault: string;
}
