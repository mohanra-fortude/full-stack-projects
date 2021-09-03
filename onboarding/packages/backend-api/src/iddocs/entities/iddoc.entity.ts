import { UserEntity } from "../../auth/entities/user.entity";
import { Client } from "../../client/entities/client.entity";
import { Document } from "../../document/entities/document.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";

@Entity({ name: "iddocs" })
export class Iddoc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, length: 50 })
  documentName: string;

  @Column({ default: null, length: 50 })
  description: string;

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

  @ManyToOne(() => UserEntity, (user) => user.userId, { nullable: false })
  @JoinColumn({ name: "userId" })
  userId: UserEntity;

  @OneToOne(() => Document, (document) => document.iddoc)
  @JoinColumn({ name: "documentId" })
  documentId: Document;
}
