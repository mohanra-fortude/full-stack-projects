import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowService } from './workflow.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressService } from '../address/address.service';
import { Address } from '../address/entities/address.entity';
import { MailService } from '../auth/mail/mail.service';
import { Workflow } from '../workflow/entities/workflow.entity';
import { Candidate } from '../candidate/entities/candidate.entity';
import { NotificationService } from '../notification/notification.service';
import { Notification } from 'rxjs';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

//@ts-ignore
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  findAll: jest.fn((entity) => entity),
  create: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
  update: jest.fn((entity) => entity),
  count: jest.fn((entity) => entity),
}));
export const addressServicemock = {};
export const notificationServicemock = {};
export const mailServicemock = {
  passwordReset: jest.fn(),
  sendEmail: jest.fn(),
};

const workflowRespose = {
    id: 17,
    description: "pavan kumar chetan kumar",
    createtime: "08/07/2021 10:54:40"
  }


describe('WorkflowService', () => {
  let service: WorkflowService;
  let workRepositoryMock: MockType<Repository<Workflow>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowService,
        {
          provide: MailService,
          useValue: mailServicemock,
        },
        {
          provide: AddressService,
          useValue: addressServicemock,
        },
        {
          provide: NotificationService,
          useValue: notificationServicemock,
        },
        {
          provide: getRepositoryToken(Address),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Workflow),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Notification),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Candidate),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<WorkflowService>(WorkflowService);
    workRepositoryMock = module.get(getRepositoryToken(Workflow));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return workflow details', async() => {
    expect( service.getWorkflowDetailsByUserId("uuid-1234")).not.toEqual(null);
  });
});
