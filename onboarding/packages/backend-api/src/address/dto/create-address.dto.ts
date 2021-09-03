import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAddressDto {
  @ApiProperty()
  addressType: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  address2?: string;

  @ApiProperty()
  address3?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  state?: string;

  @ApiProperty()
  zip?: string;

  @ApiProperty()
  userId: any;

}
