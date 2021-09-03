import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {
  @ApiProperty()
  fname: string;

  @ApiProperty()
  lname: string;

  @ApiProperty()
  designation: string;

  @ApiProperty()
  homenumber: string;

  @ApiProperty()
  manageId: string;
}
