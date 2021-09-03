import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "role" })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  role: string;

  @Column({ nullable: false, length: 50 })
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

  @Column({ nullable: false, default: 1, type: "tinyint" })
  isActive: boolean;
}
