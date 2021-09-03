import { Test, TestingModule } from '@nestjs/testing';
import { request } from 'express';
import { ClientController } from './client.controller';
import { ClientModule } from './client.module';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';


let clienServicemoke= {
  create:jest.fn(dto => {
    return {
      id:Date.now(),
      ...dto
    }
  }),
  update:jest.fn().mockImplementation(( dto) => ({
    ...dto
  })),
  findAllClients:jest.fn(),
  findOne:jest.fn(id=>id)
}


describe('ClientController', () => {
  let controller: ClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService,
        {
          provide:ClientService,
          useValue:clienServicemoke
        }
      ],
    })

    .compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
