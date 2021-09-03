import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "src/address/entities/address.entity";
import { UserEntity } from "src/auth/entities/user.entity";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { Payment } from "src/payment/entities/payment.entity";

export enum OrderStatus {
  PENDING = "pending",
  SHIPPED = "shipped",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  DECLINED = "declined",
}

@Entity({ name: "order" })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column({ default: 0, type: "decimal" })
  totalAmount: number;

  @Column({ type: "datetime" })
  shippingDate: Date;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: "datetime" })
  orderDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.order)
  user: UserEntity;

  @OneToOne(() => Address, (address) => address.order) // specify inverse side as a second parameter
  @JoinColumn()
  address: Address;

  @OneToMany(() => OrderDetail, (orderdetail) => orderdetail.order)
  orderdetail: OrderDetail[];

  @OneToOne(() => Payment, (payment) => payment.order) // specify inverse side as a second parameter
  @JoinColumn()
  payment: Payment;
}
