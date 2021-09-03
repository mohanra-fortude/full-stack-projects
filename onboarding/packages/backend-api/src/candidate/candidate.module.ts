import { Organization } from "./../organization/entities/organization.entity";
import { Module } from "@nestjs/common";
import { CandidateService } from "./candidate.service";
import { CandidateController } from "./candidate.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Candidate } from "./entities/candidate.entity";
import { Address } from "../address/entities/address.entity";
import { AddressService } from "../address/address.service";
import { Workflow } from "../workflow/entities/workflow.entity";
import { Notification } from "../notification/entities/notification.entity";
import { MailService } from "../auth/mail/mail.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Candidate,
            Address,
            Workflow,
            Notification,
            Organization,
        ]),
    ],
    controllers: [CandidateController],
    providers: [CandidateService, AddressService, MailService],
})
export class CandidateModule {}
