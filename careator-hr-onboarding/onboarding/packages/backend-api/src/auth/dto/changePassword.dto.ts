import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from "bcrypt";


export class ChangePasswordDto {
  @ApiProperty({ example: "abc@example.com" })
  @IsNotEmpty()
  oldPassword: string;
  
  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @BeforeInsert()
  async hashPassword() {
    this.newPassword = await bcrypt.hash(this.newPassword, 10); // hashed password
  }
}