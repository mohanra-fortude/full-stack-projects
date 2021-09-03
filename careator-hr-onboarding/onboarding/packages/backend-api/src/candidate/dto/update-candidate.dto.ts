import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateCandidateDto } from "./create-candidate.dto";

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {
  @ApiProperty()
  isActive: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fname: string;

  @ApiProperty()
  lname: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  jobId: any;

  @ApiProperty()
  userId?: any;

}
