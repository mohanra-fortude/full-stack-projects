import { Test, TestingModule } from '@nestjs/testing';
import { OtherdocService } from './otherdoc.service';

describe('OtherdocService', () => {
  let service: OtherdocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtherdocService],
    }).compile();

    service = module.get<OtherdocService>(OtherdocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
