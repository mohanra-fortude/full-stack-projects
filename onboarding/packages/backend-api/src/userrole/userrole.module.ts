import { Module } from "@nestjs/common";
import { UserroleService } from "./userrole.service";
import { UserroleController } from "./userrole.controller";
import { Role } from "src/role/entities/role.entity";
import { RoleService } from "src/role/role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRole } from "./entities/userrole.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([UserRole]),
  ],
  controllers: [UserroleController],
  providers: [UserroleService, RoleService],
})
export class UserroleModule {}
