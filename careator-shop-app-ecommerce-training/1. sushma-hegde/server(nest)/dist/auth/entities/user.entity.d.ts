import { Address } from "src/address/entities/address.entity";
import { OrderEntity } from "src/order/entities/order.entity";
export declare class UserEntity {
    userId: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    createdAt: Date;
    hashPassword(): Promise<void>;
    address: Address[];
    order: OrderEntity[];
}
