import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MailModule } from "./auth/mail/mail.module";
import { MailService } from "./auth/mail/mail.service";

const fakeAuth = {
  authorization: "",
};

export const mailservicemock = {
  passwordReset: jest.fn(),
  sendEmail: jest.fn(),
};

describe("AppController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: MailService,
          useValue: mailservicemock,
        },
      ],
    }).compile();
  });

  describe("App root", () => {
    it('should return "Welcome to the HR Onboarding Project!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getWelcomeMessage()).toEqual(
        "Welcome to the HR Onboarding Project!"
      );
    });
  });
});
