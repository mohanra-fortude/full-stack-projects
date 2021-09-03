import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { OrderEntity } from "src/order/entities/order.entity";

export enum PaymentStatus {
  PENDING = "pending",
  SUCCESS = "success",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REJECTED = "rejected",
}

@Entity({ name: "payment" })
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column({ type: "datetime" })
  paymentDate: Date;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column()
  payAmount: number;

  @OneToOne(() => OrderEntity, (order) => order.payment) // specify inverse side as a second parameter
  order: OrderEntity;
}
