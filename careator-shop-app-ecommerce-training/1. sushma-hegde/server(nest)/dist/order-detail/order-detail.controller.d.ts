import { OrderDetailService } from "./order-detail.service";
import { CreateOrderDetailDto } from "./dto/create-order-detail.dto";
import { UpdateOrderDetailDto } from "./dto/update-order-detail.dto";
export declare class OrderDetailController {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    create(createOrderDetailDto: CreateOrderDetailDto): import("./entities/order-detail.entity").OrderDetail;
    findAll(): Promise<import("./entities/order-detail.entity").OrderDetail[]>;
    findOne(id: string): Promise<import("./entities/order-detail.entity").OrderDetail>;
    update(id: string, updateOrderDetailDto: UpdateOrderDetailDto): Promise<import("./entities/order-detail.entity").OrderDetail>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
