import { Test, TestingModule } from '@nestjs/testing';
import { IddocsController } from './iddocs.controller';
import { IddocsService } from './iddocs.service';

describe('IddocsController', () => {
  let controller: IddocsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IddocsController],
      providers: [IddocsService],
    }).compile();

    controller = module.get<IddocsController>(IddocsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
