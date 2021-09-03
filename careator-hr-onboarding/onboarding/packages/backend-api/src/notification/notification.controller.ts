import { Body, Controller, Get, Param, Patch, Res, Post } from "@nestjs/common";
import { Notification } from "./entities/notification.entity";
import { NotificationService } from "./notification.service";
import { ApiTags } from "@nestjs/swagger";
import { UpdateCandidateStatusDto } from "src/candidate/dto/update-candidateStatus.dto";

@ApiTags("Notification")
@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.notificationService.findOne(+id);
  }

  @Post()
  createNotification(@Body() status: UpdateCandidateStatusDto) {
    return this.notificationService.create(
      status.emailFrom,
      status.emailTo,
      status.description,
      status.userId
    );
  }

  @Post("sendnotif")
  createRow(@Body() row: Notification) {
    return this.notificationService.createRow(row);
  }

  @Patch(":id")
  notificationServiceIsActive(
    @Param("id") id: string,
    @Body() updateNotificationDto
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }
}
