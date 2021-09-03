import { Organization } from './../organization/entities/organization.entity';
import { WorkflowService } from "../workflow/workflow.service";
import { AddressService } from "../address/address.service";
import { UserEntity } from "../auth/entities/user.entity";
import { Notification } from "./../notification/entities/notification.entity";
import { Address } from "../address/entities/address.entity";
import { UpdateCandidateDto } from "./dto/update-candidate.dto";
import { CreateCandidateDto } from "./dto/create-candidate.dto";
import { Test, TestingModule } from "@nestjs/testing";
import { CandidateService } from "./candidate.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { query } from "express";
import { Candidate } from "./entities/candidate.entity";
import { UserService } from "../auth/user/user.service";
import { MailService } from "../auth/mail/mail.service";
import { Workflow } from "../workflow/entities/workflow.entity";

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
export const userServicemock = {
  createUserCandidate: jest.fn().mockImplementation((Dto) => {
    return Dto;
  }),
  updateCandidateByRecruiter: jest.fn().mockImplementation((id, dto) => {
    return { id, ...dto };
  }),
};
export const notificationServicemock = {};
export const WorkflowServicemock = {};
export const mailServicemock = {
  passwordReset: jest.fn(),
  sendEmail: jest.fn(),
};
export const jwtServicemock = {
  sign: jest.fn((data) => "access-token-1234"),
};

const createCandidateDtorequest: CreateCandidateDto = {
  fname: "ranjitha",
  lname: "kr",
  email: "ranjitha@gmail.com",
  mobile: "9876543213",
  jobId: "1",
  roleId: "6",
  statusCode: "CC",
  recruiterId: "uuid-12345",
  status: "1",
  remarks: "good",
  userId: "uuid-1234",
};
const createCandidateResponse: any = {
  fname: "ranjitha",
  lname: "kr",
  email: "ranjitha@gmail.com",
  mobile: "9876543213",
  jobId: "1",
  roleId: "6",
  statusCode: "CC",
  recruiterId: "uuid-12345",
  status: "1",
  remarks: "good",
  userId: "uuid-1234",
};

const updateCandidateDtorequest: UpdateCandidateDto = {
  fname: "ranjitha",
  lname: "kr",
  email: "ranjitha@gmail.com",
  mobile: "9876543213",
  jobId: "1",
  roleId: "6",
  statusCode: "CC",
  recruiterId: "uuid-12345",
  status: "1",
  isActive: 1,
  userId: "uuid-1234",
};
const updateCandidateResponse: any = {
  fname: "ranjitha",
  lname: "kr",
  email: "ranjitha@gmail.com",
  mobile: "9876543213",
  jobId: "1",
  roleId: "6",
  statusCode: "CC",
  recruiterId: "uuid-12345",
  status: "1",
  isActive: 1,
  userId: "uuid-1234",
};
const findByQueryAndSort = {
  query: "Ramya",
  field: "firstName",
  order: "DESC",
  statusCode: "CC",
};

// const findAllRequest:findAll={
//   page:"1",
//   size:"2",
// }

// const findAllResponse:any={

// }

const notificationRepo: any = {
  fromEmail: "abc@careator.com",
  toEmail: "mohankesappa@gmail.com",
  userId: "uuid-1234",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: "admin",
  updatedBy: "admin",
};



describe("CandidateService", () => {
  let service: CandidateService;
  let userRepositoryMock: MockType<Repository<UserEntity>>;
  let notificationRepositoryMock: MockType<Repository<Notification>>;
  let candidateRepositoryMock:MockType<Repository<Candidate>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidateService,
        {
          provide: getRepositoryToken(Candidate),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Organization),
          useFactory: repositoryMockFactory,
        },

        {
          provide: WorkflowService,
          useValue: WorkflowServicemock,
        },
        {
          provide: MailService,
          useValue: mailServicemock,
        },
        {
          provide: AddressService,
          useValue: addressServicemock,
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
          provide: AddressService,
          useValue: addressServicemock,
        },
        {
          provide: UserService,
          useValue: userServicemock,
        },
        {
          provide: getRepositoryToken(Notification),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    module.get(getRepositoryToken(Candidate));

    service = module.get<CandidateService>(CandidateService);
    userRepositoryMock = module.get(getRepositoryToken(UserEntity));
    candidateRepositoryMock=module.get(getRepositoryToken(Candidate))
    notificationRepositoryMock = module.get(getRepositoryToken(Notification));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create candidate", async () => {
    userRepositoryMock.save.mockReturnValue(createCandidateResponse);
    expect(
      await userServicemock.createUserCandidate(createCandidateDtorequest)
    ).toEqual(createCandidateResponse);
  });

  it("should update candidate by recruiterId", async () => {
    userRepositoryMock.save.mockReturnValue(updateCandidateResponse);
    expect(
      await userServicemock.createUserCandidate(updateCandidateDtorequest)
    ).toEqual(updateCandidateResponse);
    
  });

  it("should findAll candidates", async () => {
    userRepositoryMock.save.mockReturnValue(createCandidateResponse);
    expect(service.findAll(1,10)).not.toEqual(null);
  });

  it("should return list of Candidates in DESC order", () => {
    const query = "Ramya";
    const field = "firstName";
    const order = "DESC";
    const statusCode = "CC";
    expect(
      service.findByQueryAndSort()
    ).not.toEqual(null);
  });


  // it("should return notification",  ()=>{
  //   userRepositoryMock.save.mockReturnValue(createCandidateResponse);
  //   expect( userServicemock.createUserCandidate(findNotificationRequest)
  //   ).toEqual(findnotificationResponse);
  // });
});
