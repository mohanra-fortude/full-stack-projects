import { Injectable } from "@nestjs/common";
import { CreateOrderDetailDto } from "./dto/create-order-detail.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateOrderDetailDto } from "./dto/update-order-detail.dto";
import { OrderDetail } from "./entities/order-detail.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>
  ) {}
  create(createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailRepository.create(createOrderDetailDto);
  }

  findAll() {
    return this.orderDetailRepository.find();
  }

  findOne(id: number) {
    return this.orderDetailRepository.findOne(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDetailDto) {
    return this.orderDetailRepository.findOne(id);
  }

  remove(id: number) {
    return this.orderDetailRepository.delete({ orderDetailId: id });
  }
}
