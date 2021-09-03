import { UserEntity } from "../../auth/entities/user.entity"



import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity({ name: "address" })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userId, { nullable: false,eager:true })
  @JoinColumn({ name: "userId" })
  userId: UserEntity[];

  @Column({ nullable: false, length: 50 })
  addressType: string;

  @Column({ nullable: false, length: 50 })
  address: string;

  @Column({ default: null, length: 50 })
  address2: string;

  @Column({ nullable: true, length: 20 })
  address3: string;

  @Column({ default: null, length: 50 })
  city: string;

  @Column({ default: null, length: 50 })
  state: string;

  @Column({ default: null, length: 10 })
  zip: string;

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

  @Column({ nullable: true, default: 1 })
  isActive: boolean;
}
