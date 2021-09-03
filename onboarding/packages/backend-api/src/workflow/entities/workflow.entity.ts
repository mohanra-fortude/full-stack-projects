import { Employee } from "./../../employees/entities/employee.entity";
import { Candidate } from "./../../candidate/entities/candidate.entity";
import { UserEntity } from "./../../auth/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "workflow" })
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, length: 300 })
  description: string;

  @Column({
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
    type: "timestamp",
  })
  createdAt: Date;

  @Column({
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
    type: "timestamp",
  })
  updatedAt: Date;

  @Column({ nullable: true, length: 50 })
  createdBy: string;

  @Column({ nullable: true, length: 50 })
  updatedBy: string;

  @Column({ nullable: true, default: true, type: "tinyint" })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.userId, { nullable: false })
  @JoinColumn({ name: "userId" })
  userId: UserEntity;
}
