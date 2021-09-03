import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderEntity } from "./entities/order.entity";
import { Repository } from "typeorm";
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: Repository<OrderEntity>);
    create(createOrderDto: CreateOrderDto): OrderEntity;
    findAll(): Promise<OrderEntity[]>;
    findOne(id: number): Promise<OrderEntity>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
