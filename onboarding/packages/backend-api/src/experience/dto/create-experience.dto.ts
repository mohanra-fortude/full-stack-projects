import { ApiProperty } from "@nestjs/swagger";

export class CreateExperienceDto {

  @ApiProperty()
  employer: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  completionDate: string;

  @ApiProperty()
  designation: string;

  @ApiProperty()
  ctc: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  skills: string;

  @ApiProperty()
  userId: any;

  @ApiProperty()
  documentId: any;

  @ApiProperty()
  isActive: boolean;
}
