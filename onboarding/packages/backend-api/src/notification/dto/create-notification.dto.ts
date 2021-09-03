import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {

  @ApiProperty()
   unRead: boolean;
}
