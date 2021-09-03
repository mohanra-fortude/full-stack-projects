import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { MailService } from "./mail/mail.service";
import { UserService } from "./user/user.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";

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

export const userRoleServicemock = {
  sign: jest.fn(),
};

export const mailServicemock = {
  passwordReset: jest.fn(),
  sendEmail: jest.fn(),
};

export const jwtServicemock = {
  sign: jest.fn(),
};

export const AuthServicemock = {
  sign: jest.fn(),
};

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UserService,
          useValue: userServicemock,
        },
        {
          provide: JwtService,
          useValue: jwtServicemock,
        },
        {
          provide: MailService,
          useValue: mailServicemock,
        },
        {
          provide: AuthService,
          useValue: AuthServicemock,
        },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
