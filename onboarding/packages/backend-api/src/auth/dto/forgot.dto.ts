import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ForgotDto {
  @ApiProperty({ example: "abc@example.com" })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  userToken: string;

  @ApiProperty()
  host1?: string;
}
