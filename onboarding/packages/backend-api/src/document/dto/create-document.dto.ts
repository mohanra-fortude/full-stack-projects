import { ApiProperty } from "@nestjs/swagger";
export class CreateDocumentDto {
  @ApiProperty()
  documentType: string;

  @ApiProperty()
  documentName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  fileUrl: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  fileExtension: string;

  @ApiProperty()
  userId: any;

  @ApiProperty()
  remarks: string;

  @ApiProperty()
  status: string;
}
