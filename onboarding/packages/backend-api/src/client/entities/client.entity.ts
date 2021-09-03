import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "client" })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false, unique: true })
  clientName: string;

  @Column({ length: 100, nullable: true })
  location: string;

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
}
