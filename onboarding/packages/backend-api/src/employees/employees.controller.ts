import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { UserroleService } from "../userrole/userrole.service";
import { SkipThrottle } from "@nestjs/throttler";
import { JwtAuthGuard } from "../auth/jwt.guard";

@ApiTags("Employee")
@Controller("employee")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    // return this.employeeService.create(createEmployeeDto);
  }
  @Get("pagination")
  findAll(@Query("page") page: number = 1, @Query("size") size: number = 2) {
    return this.employeeService.findAll(page, size);
  }

  //for search and sort query
  @Get()
  @SkipThrottle()
  findByQueryAndSort(
    @Query("q") query: string = "",
    @Query("f") field: string,
    @Query("o") order: string,
    @Query("r") role: string,
    @Query("i") userId: string
  ) {
    return this.employeeService.findByQueryAndSort(query, field, order, role);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch("deleteEmployee")
  @SkipThrottle()
  updateStatus(@Query("id") Id: string) {
    return this.employeeService.updateStatus(Id);
  }

  @Patch("changeManager")
  updateManager(@Query("suid") suid: string, @Query("auid") auid: string) {
    return this.employeeService.updateManager(suid, auid);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeeService.remove(+id);
  }

  @Get("employee-by-userId/:userId")
  findRoleByUserId(@Param("userId") userId: string) {
    return this.employeeService.findEmployeeDetailsByUserId(userId);
  }

  @Get("findOne/:id")
  findOneEmployee(@Param("id") id: string) {
    return this.employeeService.findOneEmployee(id);
  }

  @Get("managers/:id")
  findManager(@Param("id") id: string) {
    return this.employeeService.findManager(+id);
  }

  @Get("employeename/:id")
  findEmployeeNameById(@Param("id") id: number) {
    return this.employeeService.findEmployeeNameById(+id);
  }
}
