import { Module } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { EmployeeController } from "./employees.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entities/employee.entity";
import { UserroleService } from "src/userrole/userrole.service";
import { UserRole } from "src/userrole/entities/userrole.entity";
import { Role } from "src/role/entities/role.entity";
import { UserEntity } from "src/auth/entities/user.entity";
import { RoleService } from "src/role/role.service";

@Module({
  imports: [TypeOrmModule.forFeature([Employee, UserRole, Role, UserEntity])],
  // [TypeOrmModule.QueryBuilder()],
  controllers: [EmployeeController],
  providers: [EmployeesService, UserroleService, RoleService],
})
export class EmployeesModule {}
