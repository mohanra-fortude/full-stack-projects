import { OrderEntity } from "src/order/entities/order.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "orderdetail" })
export class OrderDetail {
  //@PrimaryColumn()
  @PrimaryGeneratedColumn({ type: "integer" })
  orderDetailId: number;

  @Column({ type: "decimal", precision: 10 })
  orderAmount: number;

  @Column({ type: "integer" })
  orderQty: number;

  @Column()
  productName: string;

  @Column()
  productId: number;

  @Column({ type: "integer" })
  productSalePrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderdetail)
  order: OrderEntity;
}
