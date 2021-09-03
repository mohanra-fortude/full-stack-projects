import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): import("./entities/order.entity").OrderEntity;
    findAll(): Promise<import("./entities/order.entity").OrderEntity[]>;
    findOne(id: string): Promise<import("./entities/order.entity").OrderEntity>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("./entities/order.entity").OrderEntity>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
