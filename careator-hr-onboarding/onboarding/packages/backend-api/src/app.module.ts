import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { OrganizationModule } from "./organization/organization.module";
import { UserroleModule } from "./userrole/userrole.module";
import { EmployeesModule } from "./employees/employees.module";
import { RoleModule } from "./role/role.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import AppConfig from "./config/app.config";
import { ConnectionOptions } from "typeorm";
import { CandidateModule } from "./candidate/candidate.module";
import { AddressModule } from "./address/address.module";
import { ClientModule } from "./client/client.module";
import { JobModule } from "./job/job.module";
import { OtherdocModule } from "./otherdoc/otherdoc.module";
import { DocumentModule } from "./document/document.module";
import { EducationModule } from "./education/education.module";
import { IddocsModule } from "./iddocs/iddocs.module";
import { ExperienceModule } from "./experience/experience.module";
import { FilesModule } from "./files/files.module";
import { AssetModule } from "./asset/asset.module";
import { OfferModule } from "./offer/offer.module";
import { MailService } from "./auth/mail/mail.service";
import { WorkflowModule } from "./workflow/workflow.module";
import { NotificationModule } from "./notification/notification.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "./", "frontend"),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<ConnectionOptions>("database");
      },
      inject: [ConfigService],
    }),
    AuthModule,
    OrganizationModule,
    UserroleModule,
    EmployeesModule,
    RoleModule,
    FilesModule,
    CandidateModule,
    AddressModule,
    ClientModule,
    JobModule,
    OtherdocModule,
    DocumentModule,
    EducationModule,
    IddocsModule,
    ExperienceModule,
    AssetModule,
    OfferModule,
    WorkflowModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
