import { UserEntity } from "../../auth/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Organization } from "../../organization/entities/organization.entity";

@Entity({ name: "employee" })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.userId, { nullable: false })
  @JoinColumn({ name: "userId" })
  userId: UserEntity;

  @Column({ nullable: true, length: 50 })
  firstName: string;

  @Column({ nullable: true, length: 50 })
  middleName: string;

  @Column({ nullable: true, length: 50 })
  lastName: string;

  @Column({ nullable: true, length: 15 })
  homePhone: string;

  @Column({ nullable: true, length: 10 })
  gender: string;

  @Column({ nullable: true, type: "date" })
  dateBirth: Date;

  @Column({ nullable: true, type: "date" })
  dateHire: Date;

  @Column({ nullable: false, length: 50 })
  designation: string;

  @Column({ nullable: true, length: 50 })
  department: string;

  @Column({ nullable: true, length: 50 })
  managerId: string;

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

  @Column({ nullable: false, default: true, type: "tinyint" })
  isActive: boolean;

  @OneToMany(() => Organization, (orgId) => orgId.id)
  orgId: Organization[];
}
