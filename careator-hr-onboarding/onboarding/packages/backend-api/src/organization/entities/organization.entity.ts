import { UseGuards } from "@nestjs/common";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/jwt.guard";

@ApiTags("Organization")
@UseGuards(JwtAuthGuard)
@Entity({ name: "organization" })
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  orgName: string;

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
