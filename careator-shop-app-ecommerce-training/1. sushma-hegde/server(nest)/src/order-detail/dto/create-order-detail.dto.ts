import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { OrderStatus } from "src/order/entities/order.entity";

export class CreateOrderDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  orderAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  orderQty: number;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  @IsNotEmpty()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  productSalePrice: number;
}
