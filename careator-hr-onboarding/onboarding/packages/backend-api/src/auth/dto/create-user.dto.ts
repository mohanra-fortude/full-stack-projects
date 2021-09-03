import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty()
  homePhone?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  passwordHash: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty()
  managerId?: string;

  @ApiProperty()
  designation: string;

  @ApiProperty()
  userId?: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  orgId: number;

}
