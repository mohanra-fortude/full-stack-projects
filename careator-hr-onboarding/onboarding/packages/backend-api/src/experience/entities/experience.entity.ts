import { UserEntity } from "../../auth/entities/user.entity";
import { Document } from "../../document/entities/document.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";

@Entity({ name: "experience" })
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: null, length: 50 })
  employer: string;
  @Column({ default: null, type: "date" })
  startDate: Date;
  @Column({ default: null, type: "date" })
  completionDate: Date;
  @Column({ default: null, length: 50 })
  designation: string;
  @Column({ default: null, length: 20 })
  ctc: string;
  @Column({ default: null, length: 50 })
  location: string;
  @Column({ default: null, length: 100 })
  skills: string;
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
  @ManyToOne(() => UserEntity, (user) => user.userId)
  @JoinColumn({ name: "userId" })
  userId: UserEntity;
  @OneToOne(() => Document, (document) => document.experience)
  @JoinColumn({ name: "documentId" })
  documentId: Document;
}
