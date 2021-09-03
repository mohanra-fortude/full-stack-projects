import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert } from "typeorm";
import { LoginDto } from "./login.dto";
import * as bcrypt from "bcrypt";

export class ChangeTokenDto extends PartialType(LoginDto) {
  @ApiProperty()
  userToken: string;
}
