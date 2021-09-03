import { UserEntity } from "../../auth/entities/user.entity";
import { Education } from "../../education/entities/education.entity";
import { JobEntity } from "../../job/entities/job.entity";
import { StatusEntity } from "../../status/entities/status.entity";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity({ name: "candidate" })
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  firstName: string;

  @Column({ default: null, length: 50 })
  middleName: string;

  @Column({ nullable: false, length: 50 })
  lastName: string;

  @Column({ default: null, length: 15 })
  homePhone: string;

  @Column({ default: null, length: 10 })
  gender: string;

  @Column({ default: null, type: "datetime" })
  dateBirth: Date;

  @Column({ default: null, length: 25 })
  panCard: string;

  @Column({ default: null, length: 50 })
  passport: string;

  @Column({ default: null, length: 25 })
  aadhaarCard: string;

  @Column({ nullable: true, length: 50 })
  parentFirstName: string;

  @Column({ nullable: true, length: 50 })
  parentMiddleName: string;

  @Column({ nullable: true, length: 50 })
  parentLastName: string;

  @Column({ nullable: true, length: 100 })
  emergencyContactName: string;

  @Column({ nullable: true, length: 100 })
  emergencyEmail: string;

  @Column({ nullable: true, length: 15 })
  emergencyPhone: string;

  @Column({ nullable: true, length: 50 })
  bloodGroup: string;

  @Column({ default: null, length: 50 })
  allergies: string;

  @Column({
    nullable: false,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    nullable: false,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP()",
    onUpdate: "CURRENT_TIMESTAMP()",
  })
  updatedAt: Date;

  @Column({ nullable: true, default: "admin", length: 50 })
  createdBy: string;

  @Column({ nullable: true, default: "admin", length: 50 })
  updatedBy: string;

  @Column({ nullable: true, default: 1 })
  isActive: boolean;

  @OneToOne(() => UserEntity, (user) => user.userId, { nullable: false })
  @JoinColumn({ name: "userId" })
  userId: UserEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.userId, {
    nullable: false,
  })
  @JoinColumn({ name: "recruiterId" })
  user: UserEntity[];

  @ManyToOne(() => JobEntity, (job: JobEntity) => job.id, {
    nullable: false,
  })
  @JoinColumn({ name: "jobId" })
  job: JobEntity;

  @ManyToOne(() => StatusEntity, (status: StatusEntity) => status.statusCode, {
    nullable: false,
  })
  @JoinColumn({ name: "statusCode" })
  status: StatusEntity;

  @OneToMany(() => Education, (education) => education.userId)
  education: Education[];
}
