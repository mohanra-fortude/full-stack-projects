import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobEntity } from './entities/job.entity';
import { JobService } from './job.service';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  create: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
  update: jest.fn((entity) => entity),
  count: jest.fn((entity) => entity),
}));



const createJobDtoForPass: any = {
  Jcode:'1111',
};

const createJobResponseForPass: any= {
  jobCode:'1111',
};

const createJobDtoForFail: any = {
  Jcode:'1111',
};

const createJobResponseForFail: any= {
  jobCode:'1112',
};


const updateJobDto: any = {
  Jcode:'1111',
};


const findOneResponse = {
    id: 2,
    jobCode: "1111",
    description: null,
    createdAt: "2021-06-23T05:23:35.000Z",
    updatedAt: "2021-07-01T15:32:35.000Z",
    createdBy: "recruiter",
    updatedBy: "recruiter",
    isActive: 1,
    client: {
      id: 1,
      clientName: "tcs",
      location: null,
      createdAt: "2021-06-23T05:23:35.000Z",
      updatedAt: "2021-06-23T05:23:35.000Z",
      createdBy: "recruiter",
      updatedBy: "recruiter",
      isActive: 1
    }
  }
 

  const createJobDtoResponse={
    jobCode:"1111",
    cleint:"1",
  }

describe('JobService', () => {
  let service: JobService;
  let jobRepositoryMock: MockType<Repository<JobEntity>>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService,
        {
          provide: getRepositoryToken(JobEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
    jobRepositoryMock = module.get(getRepositoryToken(JobEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create jobCode', async() => {
    expect(await service.create(createJobDtoForPass)).toEqual(createJobResponseForPass);
  });

  it('should create not jobCode', async() => {
    expect(await service.create(createJobDtoForFail)).not.toEqual(createJobResponseForFail);
  });

  it('should update client-job', () => {
    expect(service.update(updateJobDto)).not.toEqual(null)
  });
  


  it('should return one job', async() => {
    const id=1;
    jobRepositoryMock.save.mockReturnValue(findOneResponse);
    expect(await service.findOne(id)).toEqual(findOneResponse)
  });

  it('should return all jobs', () => {
    expect(service.findAll()).not.toEqual(null)
  });


  it('should create client-job', () => {
    const cdata={
      id:3,
      clientName:"TS"
    };
    const jcode="11";
    jobRepositoryMock.save.mockReturnValue(createJobDtoResponse);
    expect(service.createJob(cdata, jcode)).resolves.toEqual(createJobDtoResponse)
  });


  it('should return job is Active or not', () => {
    expect(service.updateActivation(1,updateJobDto)).not.toEqual(null)
  });
});
