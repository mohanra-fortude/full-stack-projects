import { UserService } from "../auth/user/user.service";
import { Test, TestingModule } from "@nestjs/testing";
import { CandidateController } from "./candidate.controller";
import { CandidateService } from "./candidate.service";
import { CandidateModule } from "./candidate.module";
import { CreateCandidateDto } from "./dto/create-candidate.dto";

let userServicemock = {};

const candidateServicemock = {
  create: jest.fn((dto) => {
    return {
      id: Date.now(),
      ...dto,
    };
  }),
  update: jest.fn().mockImplementation((dto) => {
    return {
      ...dto,
    };
  }),
  findOne: jest.fn((id) => {
    id;
  }),
  findAll: jest.fn(),
};

describe("CandidateController", () => {
  let controller: CandidateController;
  let service: CandidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidateController],
      providers: [
        CandidateService,
        {
          provide: CandidateService,
          useValue: candidateServicemock,
        },
        {
          provide: UserService,
          useValue: userServicemock,
        },
      ],
    })

      .compile();

    controller = module.get<CandidateController>(CandidateController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
