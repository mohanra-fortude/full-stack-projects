import { CreateOrderDetailDto } from "./dto/create-order-detail.dto";
import { UpdateOrderDetailDto } from "./dto/update-order-detail.dto";
import { OrderDetail } from "./entities/order-detail.entity";
import { Repository } from "typeorm";
export declare class OrderDetailService {
    private orderDetailRepository;
    constructor(orderDetailRepository: Repository<OrderDetail>);
    create(createOrderDetailDto: CreateOrderDetailDto): OrderDetail;
    findAll(): Promise<OrderDetail[]>;
    findOne(id: number): Promise<OrderDetail>;
    update(id: number, updateOrderDto: UpdateOrderDetailDto): Promise<OrderDetail>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
