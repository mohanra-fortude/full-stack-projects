import { ApiProperty } from "@nestjs/swagger";

export class CreateJobDto {
  @ApiProperty()
  Jcode: string;

  @ApiProperty()
  Descript: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  isActive:boolean ;
}
