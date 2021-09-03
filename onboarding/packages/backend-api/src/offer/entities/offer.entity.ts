import { UserEntity } from "src/auth/entities/user.entity";
import { Document } from "../../document/entities/document.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  Double,
} from "typeorm";

@Entity({ name: "offer" })
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.userId)
  @JoinColumn({ name: "userId" })
  userId: UserEntity[];

  @Column({ nullable: true, length: 50, default: null })
  offerStatus: string;

  @Column({ nullable: true, length: 50, default: null })
  modeOfEmp: string;

  @Column({ nullable: true, default: 0 })
  bgv: boolean;

  @Column({ nullable: true, default: 0 })
  insurance: boolean;

  @Column({ nullable: true, default: 0 })
  pf: boolean;

  @Column({ nullable: true, default: null })
  hireDate: Date;

  @Column({ nullable: true, default: null })
  workStartDate: Date;

  @Column({ nullable: true, default: 0 })
  rate: number;

  @Column({ nullable: true, default: 0 })
  ctc: number;

  @Column({ nullable: true, length: 50, default: null })
  location: string;

  @Column({ nullable: true, length: 50, default: null })
  designation: string;

  @Column({ nullable: true, length: 50, default: null })
  client: string;

  @Column({ nullable: true, length: 50, default: null })
  assetType: string;

  @Column({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP()",
    onUpdate: "CURRENT_TIMESTAMP()",
  })
  updatedAt: Date;

  @Column({ nullable: true, length: 50 })
  createdBy: string;

  @Column({ nullable: true, length: 50 })
  updatedBy: string;

  @Column({ nullable: true })
  releaseNumber: number;

  @OneToOne(() => Document, (document) => document.education)
  @JoinColumn({ name: "documentId" })
  documentId: Document;
}
