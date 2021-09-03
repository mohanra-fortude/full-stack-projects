import { UserEntity } from "src/auth/entities/user.entity";
import { OrderEntity } from "src/order/entities/order.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "address" })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: "integer" })
  pincode: number;

  @Column({ type: "datetime" })
  createdAt: string;

  // many addresses will be for one user entity
  @ManyToOne((type) => UserEntity, (user) => user.address)
  user: UserEntity;

  @OneToOne(() => OrderEntity, (order) => order.address) // specify inverse side as a second parameter
  @JoinColumn()
  order: OrderEntity;
}
