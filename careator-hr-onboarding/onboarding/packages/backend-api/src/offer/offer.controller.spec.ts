import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../auth/user/user.service';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';

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

export const offerServiceMock = {
  
};

describe('OfferController', () => {
  let controller: OfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferController],
      providers: [OfferService,
         {
          provide: UserService,
          useValue: userServicemock,
        },
          {
          provide: OfferService,
          useValue: offerServiceMock,
        },
      ],
    }).compile();

    controller = module.get<OfferController>(OfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
