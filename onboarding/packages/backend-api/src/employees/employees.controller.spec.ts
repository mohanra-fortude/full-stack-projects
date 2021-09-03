import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../auth/user/user.service';
import { RoleService } from '../role/role.service';
import { UserroleService } from '../userrole/userrole.service';
import { EmployeeController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  create: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
  update: jest.fn((entity) => entity),
  count: jest.fn((entity) => entity),
}));
const userServicemock = {
  createUserRoleEmployee:jest.fn(dto=> {
    return {
      ...dto
    }
  })
}
const userroleServicemock = {
  create:jest.fn(dto=> {
    return {
      ...dto
    }
  })
}
const roleServicemock = {
  create:jest.fn(dto=> {
    return {
      ...dto
    }
  })
}
describe('EmployeesController', () => {
  let controller: EmployeeController;
  let userRepositoryMock: MockType<Repository<Employee>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useFactory: repositoryMockFactory,
        },
        {
          provide: UserService,
          useValue: userServicemock,
        },
        {
          provide: UserroleService,
          useValue: userroleServicemock,
        },
        {
          provide: RoleService,
          useValue:roleServicemock,
        },],
    }).compile();
    userRepositoryMock = module.get(getRepositoryToken(Employee));
    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
