import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../auth/user/user.service';
import { RoleService } from '../role/role.service';
import { UserroleService } from '../userrole/userrole.service';
import { Repository } from 'typeorm';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { UserEntity } from '../auth/entities/user.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

//@ts-ignore
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  findAll: jest.fn((entity) => entity),
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
  }),
  update:jest.fn(dto=> {
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

const createEmployeeDto:any = {
  userId:"uuid-1234",
  firstName:"revanth",
  lastName:"kumar",
  managerId:"uuid-1234",
  designation:"react",
  homePhone:"222222",
  createdAt: Date,
  updatedAt: Date,
  createdBy: "admin",
  updatedBy: "admin",
}
const createEmployeeResponse = {
  userId:"uuid-1234",
  firstName:"revanth",
  lastName:"kumar",
  managerId:"uuid-1234",
  designation:"react",
  homePhone:"222222",
  createdAt: Date,
  updatedAt: Date,
  createdBy: "admin",
  updatedBy: "admin",

}

describe('EmployeesService', () => {
  let service: EmployeesService;
  let userRepositoryMock: MockType<Repository<UserEntity>>;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(UserEntity),
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
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    userRepositoryMock = module.get(getRepositoryToken(UserEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create employee", async () => {
    userRepositoryMock.save.mockReturnValue(createEmployeeResponse)
    expect(
      await userServicemock.createUserRoleEmployee(createEmployeeDto)
    ).toEqual(createEmployeeResponse);
  });

  it("should update employee", async () => {
    userRepositoryMock.save.mockReturnValue(createEmployeeResponse)
    expect(
      await userServicemock.update(createEmployeeDto)
    ).toEqual(createEmployeeResponse);
  });

  it("should return one employee data", async()=> {
    expect( service.findEmployeeDetailsByUserId("uuid-1234")).not.toEqual(null)
  })

});
