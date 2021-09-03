import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
import { MailService } from '../auth/mail/mail.service';
import { NotificationService } from '../notification/notification.service';
import { Workflow } from './entities/workflow.entity';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';

export const addressServicemock = {};
export const notificationServicemock = {};
const workServicemock = {}
export const mailServicemock = {
  passwordReset: jest.fn(),
  sendEmail: jest.fn(),
};

describe('WorkflowController', () => {
  let controller: WorkflowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowController],
      providers: [
        {
          provide: MailService,
          useValue: mailServicemock,
        },
        {
          provide: WorkflowService,
          useValue: workServicemock,
        },
        {
          provide: AddressService,
          useValue: addressServicemock,
        },
        {
          provide: NotificationService,
          useValue: notificationServicemock,
        },
      ],
    }).compile();

    controller = module.get<WorkflowController>(WorkflowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
