import { UserEntity } from "../../auth/entities/user.entity";
import { Candidate } from "../../candidate/entities/candidate.entity";
import { Client } from "../../client/entities/client.entity";
import { Document } from "../../document/entities/document.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";

@Entity({ name: "education" })
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, length: 50 })
  institute: string;

  @Column({ default: null, type: "date" })
  startDate: Date;

  @Column({ default: null, type: "date" })
  completionDate: Date;

  @Column({ default: null, length: 50 })
  degree: string;

  @Column({ default: null, length: 50 })
  grade: string;

  @Column({ default: null, length: 50 })
  subjects: string;

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

  @Column({ nullable: true, default: "Candidate", length: 50 })
  createdBy: string;

  @Column({ nullable: true, default: "Candidate", length: 50 })
  updatedBy: string;

  @Column({ nullable: true, default: 1 })
  isActive: boolean;

  // many education docs will be for one userentity
  @ManyToOne(() => UserEntity, (user) => user.userId, {
    nullable: false,
  })
  @JoinColumn({ name: "userId" })
  userId: UserEntity;

  @OneToOne(() => Document, (document) => document.education)
  @JoinColumn({ name: "documentId" })
  documentId: Document;
}
