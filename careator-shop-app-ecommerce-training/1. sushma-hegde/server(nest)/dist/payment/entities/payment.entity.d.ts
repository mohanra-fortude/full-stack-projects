import { OrderEntity } from "src/order/entities/order.entity";
export declare enum PaymentStatus {
    PENDING = "pending",
    SUCCESS = "success",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    REJECTED = "rejected"
}
export declare class Payment {
    paymentId: number;
    paymentDate: Date;
    status: PaymentStatus;
    payAmount: number;
    order: OrderEntity;
}
