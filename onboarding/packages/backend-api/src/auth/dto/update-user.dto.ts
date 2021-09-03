import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert } from "typeorm";
import { LoginDto } from "./login.dto";
import * as bcrypt from "bcrypt";

export class UpdateUserDto extends PartialType(LoginDto) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  firstTimeLogin: boolean;

  @ApiProperty()
  userToken: string;
}
