import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateCandidateDto } from "./create-candidate.dto";

export class UpdateCandidateStatusDto extends PartialType(CreateCandidateDto) {
  @ApiProperty()
  @IsNotEmpty()
  statusCode: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  emailTo: string;

  @ApiProperty()
  cc?: any;

  @ApiProperty()
  emailFrom?: string;

  @ApiProperty()
  subject?: string;

  @ApiProperty()
  leaderId?: string;

  @ApiProperty()
  content?: string;

  @ApiProperty()
  mailData?: {
    link: any;
    fullname: any;
  };

  @ApiProperty()
  userId1?: any;

  @ApiProperty()
  emailDataToSent?: any;

  @ApiProperty()
  fileName?: any;
}
