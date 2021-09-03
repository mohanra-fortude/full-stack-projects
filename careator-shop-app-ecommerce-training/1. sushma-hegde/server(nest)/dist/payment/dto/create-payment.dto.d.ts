import { PaymentStatus } from "../entities/payment.entity";
export declare class CreatePaymentDto {
    paymentDate: Date;
    status: PaymentStatus;
    payAmount: number;
}
