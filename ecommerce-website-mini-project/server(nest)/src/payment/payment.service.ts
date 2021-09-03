import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./entities/Payment.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepository.create(createPaymentDto);
  }

  findAll() {
    return this.paymentRepository.find();
  }

  findOne(id: number) {
    return this.paymentRepository.findOne(id);
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.findOne(id);
  }

  remove(id: number) {
    return this.paymentRepository.delete({ paymentId: id });
  }
}
