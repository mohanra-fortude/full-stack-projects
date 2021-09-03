import { CandidateService } from "./../candidate/candidate.service";
import { Address } from "src/address/entities/address.entity";
import { UserEntity } from "src/auth/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Notification } from "src/notification/entities/notification.entity";
import { WorkflowService } from "./workflow.service";
import { WorkflowController } from "./workflow.controller";
import { Candidate } from "src/candidate/entities/candidate.entity";
import { Workflow } from "./entities/workflow.entity";
import { UserroleService } from "src/userrole/userrole.service";
import { UserRole } from "src/userrole/entities/userrole.entity";
import { Role } from "src/role/entities/role.entity";
import { RoleService } from "src/role/role.service";
import { NotificationService } from "src/notification/notification.service";
import { AddressService } from "src/address/address.service";
import { MailService } from "src/auth/mail/mail.service";
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Workflow,
      Address,
      UserEntity,
      UserRole,
      Notification,
      Role,
      Candidate,
    ]),
  ],
  controllers: [WorkflowController],
  providers: [
    WorkflowService,
    CandidateService,
    AddressService,
    UserroleService,
    MailService,
    RoleService,
    NotificationService,
  ],
  exports: [WorkflowService],
})
export class WorkflowModule {}
