import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../auth/user/user.service";
import { RoleService } from "../role/role.service";
import { UserroleService } from "../userrole/userrole.service";
import { Repository } from "typeorm";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Employee } from "./entities/employee.entity";
import { getConnection } from "typeorm";

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private userroleService: UserroleService,
    private roleService: RoleService,
    private userService: UserService
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.save({});
  }

  async findAll(page: number, size: number) {
    const res = await this.employeeRepository.findAndCount({
      take: size,
      skip: (page - 1) * size,
    });
    return {
      totalNumber: res[1],
      data: res[0],
      currentPage: page,
      totalPages: Math.ceil(res[1] / size),
    };
  }

  findOne(id: number) {
    return this.employeeRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException(); //throw new HttpException({}, 204);
      return data;
    });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return this.employeeRepository.delete({ id });
  }

  
  async findByQueryAndSort(
    query: string = "",
    field: string = "employeeId",
    order: string = "DESC",
    role: string = "",
    userId: string = "cbb856cf-580b-4b33-829a-93ad2c5dfcc2"
  ) {
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // now we can execute any queries on a query runner, for example:

    let data;

    data = await queryRunner.query(`
      SELECT
        e.id AS employeeId,
        e.firstName AS firstName,
        e.lastName AS lastName,
        e.homePhone AS homePhone,
        e.gender AS gender,
        e.dateBirth AS dateBirth,
        e.dateHire AS dateHire,
        e.department AS department,
        e.designation AS designation,
        m.managerName AS managerName,
        e.managerId AS managerId,
        e.isActive AS isActive,
        m.managerRole AS managerRole,
        r.description AS userRole,
	  r.id as roleId,
        u.email AS email,
        u.mobile AS mobile,
        u.userId AS userId
      FROM employee e
      INNER JOIN user u ON e.userId = u.userId
      INNER JOIN userrole ur on  u.userId=ur.userid
      INNER JOIN role r on ur.roleId=r.id
      LEFT JOIN (
          SELECT
          em.userId AS mID,
          CONCAT(IFNULL(firstName, ''), ' ', IFNULL(lastName, '')) AS managerName,
          rm.role as managerRole
          FROM employee em
          INNER JOIN user um ON em.userId = um.userId
          INNER JOIN userrole urm on  um.userId=urm.userid
          INNER JOIN role rm on urm.roleId=rm.id
      ) m ON e.managerId = m.mId
      WHERE
        (
        e.firstName like '%${query}%' or u.email like '%${query}%' or managerName like '%${query}%'
        )
        and e.isActive=1
        and case when ${role} <> '' then find_in_set (r.id ,${role}) else r.id like '%' end
      ORDER BY ${field} ${order}
      `);

    queryRunner.release();

    //added this line for fixing issue
    return data;
  }

  async findEmployeeDetailsByUserId(userId: string) {
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // now we can execute any queries on a query runner, for example:
    let data = await queryRunner.query(`
        SELECT
          u.lastLogin,
          e.firstName AS firstName,
          e.lastName AS lastName,
          CONCAT(firstName,' ',lastName) AS fullName,
          u.profilePicture,
          u.userId AS userId,
          r.role AS userRole,
          u.email AS email,
          u.mobile AS mobile,
          u.firstTimeLogin AS firstTimeLogin
        FROM employee e
        INNER JOIN user u ON e.userId = u.userId
        INNER JOIN userrole ur ON u.userId = ur.userId
        INNER JOIN role r ON ur.roleId = r.id
        WHERE u.userId like '${userId}'`);

    queryRunner.release();

    try {
      if (typeof data !== "undefined" && data.length === 0) {
     
        return "null";
   
      } else {

        return Promise.resolve(data); //logger
      }
    } catch (error) {
      this.logger.error(error);
      return Promise.reject(error);
    }
  }

  async findOneEmployee(id: string) {

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // now we can execute any queries on a query runner, for example:
    let data = await queryRunner.query(`
      SELECT
          e.id AS employeeId,
          e.firstName AS firstName,
          e.lastName AS lastName,
          CONCAT(firstName,' ',lastName) AS fullName,
          e.homePhone AS homePhone,
          e.gender AS gender,
          e.dateBirth AS dateBirth,
          e.dateHire AS dateHire,
          e.department AS department,
          e.designation AS designation,
          m.managerName AS managerName,
          m.memail AS managerEmail,
          e.managerId AS managerId,
          e.isActive AS isActive,
          m.managerRole AS managerRole,
          r.description AS userRole,
          u.email AS email,
          u.mobile AS mobile,
          u.userId AS userId,
          ur.roleId
        FROM employee e
        INNER JOIN user u ON e.userId = u.userId
        INNER JOIN userrole ur on  u.userId=ur.userid
        INNER JOIN role r on ur.roleId=r.id
        LEFT JOIN (
            SELECT
            em.userId AS mID,
            um.email as memail,
            CONCAT(IFNULL(firstName, ''), ' ', IFNULL(lastName, '')) AS managerName,
            rm.role as managerRole
            FROM employee em
            INNER JOIN user um ON em.userId = um.userId
            INNER JOIN userrole urm on  um.userId=urm.userid
            INNER JOIN role rm on urm.roleId=rm.id
        ) m ON e.managerId = m.mId
        WHERE u.userId like '${id}'`);

    queryRunner.release();

    return data;
  }

  findManager = async (id: number) => {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // now we can execute any queries on a query runner, for example:
    let managerData = await queryRunner.query(`
        SELECT
          e.firstName AS firstName,
          e.lastName AS lastName,
          u.userId,
          r.role AS userRole,
          u.email AS email,
          u.mobile AS mobile
        FROM employee e
        INNER JOIN user u ON e.userId = u.userId
        INNER JOIN userrole ur ON u.userId = ur.userId
        INNER JOIN role r ON ur.roleId = r.id
        WHERE ur.roleId = ${id}-1 AND e.isActive = 1;`);

    queryRunner.release();

    return managerData;
  };

  findEmployeeNameById(id: number) {
    return this.employeeRepository.findOne(
      { id: id },
      { select: ["id", "firstName", "lastName"] }
    );
  }

  updateStatus = async (id: any) => {
    await this.userService.deleteUser(id, { isActive: false });
    return this.employeeRepository.update(
      { userId: id },
      {
        isActive: false,
      }
    );
  };

  updateManager(suid: any, auid: string) {
    return this.employeeRepository.update(
      { managerId: suid },
      {
        managerId: auid,
      }
    );
  }
}
