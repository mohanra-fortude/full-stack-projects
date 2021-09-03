import { ApiProperty } from "@nestjs/swagger";
export class CreateOtherdocDto {
  @ApiProperty()
  documentName: string;

  @ApiProperty()
  description: string;
}
