import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  Location: string;

  @ApiProperty()
  Jcode: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdBy: string;
}
