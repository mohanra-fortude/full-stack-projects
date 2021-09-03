import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from './offer.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Offer } from './entities/offer.entity';
import { UserService} from '../auth/user/user.service';
import { CreateOfferDto } from './dto/create-offer.dto';

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

export const userServicemock = {
  passwordReset: jest.fn(),
  sendEmail: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  updateToken: jest.fn(),
  createUserCandidate: jest.fn(),
  updateCandidateByRecruiter: jest.fn(),
};

const createOfferDtorequest:CreateOfferDto = {
  userId:"uuid-1234",
  hireDate:null,
  workStartDate:null,
  rate:1200,
  ctc:5,
  location:"bangalore",
  designation:"fullstack developer",
  client:"tcs",
  assetType:"careator-laptop",
  isActive:true,
  createdBy:"admin",
  updatedBy:"admin",
  offerStatus:"HRD",
  bgv:true,
  pf:true,
  insurance:true,
  modeOfEmp:"contract"
  
};

const createOfferDtoResponse:any={
 userId:"uuid-1234",
  hireDate:null,
  workStartDate:null,
  rate:1200,
  ctc:5,
  location:"bangalore",
  designation:"fullstack developer",
  client:"tcs",
  assetType:"careator-laptop",
  isActive:true,
  createdBy:"admin",
  updatedBy:"admin",
  offerStatus:"HRD",
  bgv:true,
  pf:true,
  insurance:true,
  modeOfEmp:"contract"
  
}


describe("OfferService", () => {
  let service: OfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferService,
         {
          provide: getRepositoryToken(Offer),
          useFactory: repositoryMockFactory,
        },
         {
          provide: UserService,
          useValue: userServicemock,
        },
      ],
      
    }).compile();

    service = module.get<OfferService>(OfferService);
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });


  //testing for create
   it("Should create data in offer table", async () => {
    expect(await service.create("uuid-1234",createOfferDtorequest)).toEqual(
      createOfferDtoResponse
    );
  
  });

  //testing for getting offer by OfferId
  it("Should display offer data by userId" ,()=>{
    expect( service.getOfferById("uuid-1234")).not.toEqual(null)
  })


});
function registerUser(userDto: any, CreateUserDto: any) {
  throw new Error('Function not implemented.');
}

function userDto(userDto: any, CreateUserDto: any) {
  throw new Error('Function not implemented.');
}

