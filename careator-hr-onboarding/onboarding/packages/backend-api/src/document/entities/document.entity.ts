import { Iddoc } from "./../../iddocs/entities/iddoc.entity";
import { UserEntity } from "../../auth/entities/user.entity";
import { Education } from "../../education/entities/education.entity";
import { Otherdoc } from "../../otherdoc/entities/otherdoc.entity";
import { Experience } from "../../experience/entities/experience.entity";

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";

@Entity({ name: "document" })
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userId, { nullable: false })
  @JoinColumn({ name: "userId" })
  userId: UserEntity;

  @OneToOne(() => Otherdoc, (otherdoc) => otherdoc.documentId)
  otherdoc: Otherdoc;

  @OneToOne(() => Education, (education) => education.documentId)
  education: Education;

  @OneToOne(() => Iddoc, (iddoc) => iddoc.documentId)
  iddoc: Iddoc;

  @OneToOne(() => Experience, (experience) => experience.documentId)
  experience: Experience;

  @Column({ length: 5, default: "U", nullable: false })
  status: string;

  @Column({ length: 50, nullable: true })
  documentType: string;

  @Column({ nullable: true })
  documentName: string;

  @Column({ length: 250, nullable: true })
  description: string;

  @Column({ length: 250, nullable: true })
  fileUrl: string;

  @Column({ length: 250, nullable: true })
  fileName: string;

  @Column({ length: 25, nullable: true })
  fileExtension: string;

  @Column({ length: 500, nullable: true })
  remarks: string;

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

  @Column({ nullable: false, default: true, type: "tinyint" })
  isActive: boolean;


  
}
