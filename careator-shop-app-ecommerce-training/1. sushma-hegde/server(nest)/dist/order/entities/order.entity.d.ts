import { Address } from "src/address/entities/address.entity";
import { UserEntity } from "src/auth/entities/user.entity";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { Payment } from "src/payment/entities/payment.entity";
export declare enum OrderStatus {
    PENDING = "pending",
    SHIPPED = "shipped",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    DECLINED = "declined"
}
export declare class OrderEntity {
    orderId: number;
    totalAmount: number;
    shippingDate: Date;
    status: OrderStatus;
    orderDate: Date;
    user: UserEntity;
    address: Address;
    orderdetail: OrderDetail[];
    payment: Payment;
}
