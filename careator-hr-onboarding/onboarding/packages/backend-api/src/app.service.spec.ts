import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";

describe("AppService", () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();
    service = app.get<AppService>(AppService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("root", () => {
    it('should return "Welcome to the HR Onboarding Project!"', () => {
      expect(service.getWelcomeMessage()).toEqual(
        "Welcome to the HR Onboarding Project!"
      );
    });
  });
});
