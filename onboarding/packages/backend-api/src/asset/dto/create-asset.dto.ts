

import { ApiProperty } from "@nestjs/swagger";
export class CreateAssetDto {
    
  @ApiProperty()
  userId: any;

  
  @ApiProperty()
  model: string

  

  
  @ApiProperty()
  processorType: string

  
  @ApiProperty()
  ram: string

  
  @ApiProperty()
  storageType: string

  
  @ApiProperty()
  storageSpace: string
  
  

  @ApiProperty()
  createdBy?: string;

  
  @ApiProperty()
  updatedBy?: string;



  @ApiProperty()
  isActive?: boolean;

}
