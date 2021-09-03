import { Client } from "../../client/entities/client.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "job" })
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false, unique: true })
  jobCode: string;

  @Column({ length: 255, nullable: true })
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

  @Column({ nullable: true, length: 100 })
  createdBy: string;

  @Column({ nullable: true, length: 100 })
  updatedBy: string;

  @Column({ nullable: false, default: 1, type: "tinyint" })
  isActive: boolean;

  @ManyToOne(() => Client, (client: Client) => client.id, { nullable: false })
  @JoinColumn({ name: "clientId" })
  client: Client;
}
