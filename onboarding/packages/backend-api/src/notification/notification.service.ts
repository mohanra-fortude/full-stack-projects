import { CreateNotificationDto } from "./dto/create-notification.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { Notification } from "./entities/notification.entity";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>
  ) {}
  async create(
    emailFrom: string,
    emailTo: string,
    description: string,
    userId: any
  ) {
    return this.notificationRepository.save({
      fromEmail: emailFrom,
      toEmail: emailTo,
      subject: description,
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: userId,
      updatedBy: userId,
    });
  }

  findAll() {
    return this.notificationRepository.find();
  }

  findOne(id: number) {
    return this.notificationRepository.findOne(id);
  }

  createRow(row: Notification) {
    return this.notificationRepository.save(row);
  }

  async update(id: any, updateNotificationDto: UpdateNotificationDto) {
    const { unRead } = updateNotificationDto;
    const updateNotification = await this.notificationRepository.update(
      {
        id: id,
      },
      {
        unRead: unRead,
      }
    );
    return updateNotification;
  }
}
