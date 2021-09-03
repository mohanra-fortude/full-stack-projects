import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';
import { JobService } from './job.service';


const jobServicemoke= {
  create:jest.fn(dto => {
    return {
      id:Date.now(),
      ...dto
    }
  }),
  update:jest.fn().mockImplementation(dto=> {
    return {
      ...dto
    }
  }),
  findOne:jest.fn( id => {
    id
  }),
  findAll:jest.fn()
}



describe('JobController', () => {
  let controller: JobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        {
          provide:JobService,
          useValue:jobServicemoke
        }
      ],
    })
    // .overrideProvider(JobService)
    // .useValue(jobServicemoke)
    .compile();

    controller = module.get<JobController>(JobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
