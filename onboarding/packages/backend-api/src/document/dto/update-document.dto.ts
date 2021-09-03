import { ApiProperty } from "@nestjs/swagger";
export class UpdateDocumentDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  remarks: string;
}
