import { OrderEntity } from "src/order/entities/order.entity";
export declare class OrderDetail {
    orderDetailId: number;
    orderAmount: number;
    orderQty: number;
    productName: string;
    productId: number;
    productSalePrice: number;
    order: OrderEntity;
}
