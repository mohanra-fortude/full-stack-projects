import { Notification } from "./../notification/entities/notification.entity";
import { Global, Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UserEntity } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { UserService } from "./user/user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import constants from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt.guard";
import { MailModule } from "./mail/mail.module";
import { MailService } from "./mail/mail.service";
import { UserroleService } from "src/userrole/userrole.service";
import { Employee } from "src/employees/entities/employee.entity";
import { Role } from "src/role/entities/role.entity";
import { UserRole } from "src/userrole/entities/userrole.entity";
import { Candidate } from "src/candidate/entities/candidate.entity";
import { Document } from "src/document/entities/document.entity";
import { FilesModule } from "src/files/files.module";
import { Workflow } from "src/workflow/entities/workflow.entity";
import { UserroleModule } from "src/userrole/userrole.module";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([UserRole]),
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([Candidate]),
    TypeOrmModule.forFeature([Notification]),
    TypeOrmModule.forFeature([Workflow]),
    FilesModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: 60 * 24 * constants.EXPIRATION_TIME },
      secret: constants.SECRET_KEY,
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    JwtAuthGuard,
    MailService,
    UserroleService,
  ],
  exports: [UserService, AuthService, JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
