import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "status" })
export class StatusEntity {
  @Column({ length: 50, nullable: false, unique: true })
  status: string;
  @PrimaryColumn({ length: 5, nullable: false, unique: true })
  statusCode: string;

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

  @Column({ nullable: true, default: "recruiter", length: 50 })
  createdBy: string;

  @Column({ nullable: true, default: "recruiter", length: 50 })
  updatedBy: string;

  @Column({ nullable: false, default: 1, type: "tinyint" })
  isActive: boolean;
}
