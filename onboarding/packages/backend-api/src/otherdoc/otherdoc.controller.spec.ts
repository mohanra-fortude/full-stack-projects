import { Test, TestingModule } from '@nestjs/testing';
import { OtherdocController } from './otherdoc.controller';
import { OtherdocService } from './otherdoc.service';

describe('OtherdocController', () => {
  let controller: OtherdocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtherdocController],
      providers: [OtherdocService],
    }).compile();

    controller = module.get<OtherdocController>(OtherdocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
