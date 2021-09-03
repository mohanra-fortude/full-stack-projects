import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PaymentStatus } from "../entities/payment.entity";

export class CreatePaymentDto {
  @ApiProperty()
  paymentDate: Date;

  @ApiProperty()
  status: PaymentStatus;

  @ApiProperty()
  @IsNotEmpty()
  payAmount: number;
}
