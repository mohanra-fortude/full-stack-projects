import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCandidateDto {
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
  roleId: any;

  @ApiProperty()
  statusCode: any;

  @ApiProperty()
  recruiterId: any;

  @ApiProperty()
  middleName?: string;

  @ApiProperty()
  homePhone?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  dateBirth?: string;

  @ApiProperty()
  panCard?: string;

  @ApiProperty()
  passport?: string;

  @ApiProperty()
  aadhaarCard?: string;

  @ApiProperty()
  parentFirstName?: string;

  @ApiProperty()
  parentMiddleName?: string;

  @ApiProperty()
  parentLastName?: string;

  @ApiProperty()
  emergencyContactName?: string;

  @ApiProperty()
  emergencyEmail?: string;

  @ApiProperty()
  emergencyPhone?: string;

  @ApiProperty()
  allergies?: string;

  @ApiProperty()
  bloodGroup?: string;

  @ApiProperty()
  userId?: any;

  @ApiProperty()
  status: string;

  @ApiProperty()
  remarks: string;
  
}
