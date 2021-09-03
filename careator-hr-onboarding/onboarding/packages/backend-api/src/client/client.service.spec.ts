import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobEntity } from '../job/entities/job.entity';
import { Repository } from 'typeorm';
import { JobService } from '../job/job.service';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { CreateJobDto } from 'src/job/dto/create-job.dto';



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


export const jobServicemoke={
  create:jest.fn(),
  creteJob:jest.fn().mockImplementation((cdata,Jcode)=> {
    return {
      id:1,
      jobCode: Jcode,
      client: cdata,
    }
  }),
  update: jest.fn((dto) => {
    return {
      id:1,
      ...dto,
    };
  }),
  findByQueryAndSort:jest.fn().mockImplementation((query,field,order)=> {
    return {
          clientId: 1,
          clientName: "tcs",
          jobId: 1,
          isActive: 1,
          jobCode: "1111"
    }
  })
};


const createClientDto: any= {
  Name:'TCS',
  Jcode:'1111',
};

const createClienResponse: any= {
  id:1,
  clientName:'TCS121',
  Location:"Bangaluru",
  createdAt: Date,
  updatedAt: Date,
  createdBy: "recruiter",
  updatedBy: "recruiter",
  isActive: 1,
};  

const updateClientDto: any= {
  id:"1",
  clientName:"TCS",

};

const updateClienResponse: any= {
  Name:'Wipro',
  Location:"Hydarabad",
  Jcode:'1113',
  id:1
};

const findByQueryAndSortDto ={
  query : "TCS",
  field:  "clientName",
  order:  "DESC"
}

const findByQueryAndSortResponse =
    {
      clientId: 1,
      clientName: "TCS",
      jobId: 1,
      isActive: 1,
      jobCode: "1111"
    }

  const  findClienByNametResponse = {
    id:1,
    clientName:"TCS"
  }

  const findByIDResponse = {
    id:1,
    ClientName:"TCS",
    Location:"bangaluru",
    isActive:true
  }
 
 
describe('ClientService', () => {
  let service: ClientService;
  let clientRepositoryMock: MockType<Repository<Client>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService,
        {
          provide: getRepositoryToken(Client),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(JobEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide:JobService,
          useValue:jobServicemoke
        },
      ],
    }).compile();
    clientRepositoryMock = module.get(getRepositoryToken(Client));

    service = module.get<ClientService>(ClientService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one clinetName ', () => {
    const clientName="TCS";
    clientRepositoryMock.save.mockReturnValue(findClienByNametResponse);
    expect(service.findByClientName(clientName)).resolves.toEqual(findClienByNametResponse)
  });

  it('should create client-job', () => {
    clientRepositoryMock.save.mockReturnValue(createClienResponse);
    expect(service.create(createClientDto)).resolves.toEqual(createClienResponse)
    // expect(service.findByClientName).toHaveBeenCalled();
    // expect(jobServicemoke.creteJob).toHaveBeenCalled();
  });


  it('should update client-job', () => {
    const updateClientDto: any= {
      id:"1",
      clientName:"TCS",
    };
    expect(service.update(updateClientDto)).not.toEqual(null)
  });

  it('should return one client-job', () => {
    clientRepositoryMock.save.mockReturnValue(findByIDResponse);
    expect(service.findById(2)).resolves.toEqual(findByIDResponse)
  });

  it('should return all client-jobs', () => {
    expect(service.findAllClients()).not.toEqual(null)
  });
  

  it('should return client-jobs in DEC order', () => {
  const query = "TCSDD";
  const field=  "clientName";
  const order=  "DESC";
   clientRepositoryMock.save.mockReturnValue(findByQueryAndSortResponse);
   expect(service.findByQueryAndSort(query,field,order)).resolves.toEqual(findByQueryAndSortResponse);
  });

});
