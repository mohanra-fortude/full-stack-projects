import { Test, TestingModule } from '@nestjs/testing';
import { IddocsService } from './iddocs.service';

describe('IddocsService', () => {
  let service: IddocsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IddocsService],
    }).compile();

    service = module.get<IddocsService>(IddocsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
