import { ApiProperty } from "@nestjs/swagger";
import { Double } from "typeorm";

export class CreateOfferDto {
  @ApiProperty()
  userId: any;

  @ApiProperty()
  offerStatus?: string;

  @ApiProperty()
  modeOfEmp?: string;

  @ApiProperty()
  releaseNumber?: number;

  @ApiProperty()
  insurance?: boolean;

  @ApiProperty()
  hireDate?: Date;

  @ApiProperty()
  workStartDate?: Date;

  @ApiProperty()
  rate?: number;

  @ApiProperty()
  ctc?: number;

  @ApiProperty()
  location?: string;

  @ApiProperty()
  designation?: string;

  @ApiProperty()
  client?: string;

  @ApiProperty()
  assetType?: string;

  @ApiProperty()
  createdBy?: string;

  @ApiProperty()
  updatedBy?: string;

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  bgv?: boolean;

  @ApiProperty()
  pf?: boolean;
}
