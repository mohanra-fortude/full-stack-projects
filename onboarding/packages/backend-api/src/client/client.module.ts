import { Module } from "@nestjs/common";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./entities/client.entity";
import { JobEntity } from "../job/entities/job.entity";
import { JobService } from "src/job/job.service";

@Module({
  imports: [TypeOrmModule.forFeature([Client, JobEntity])],
  controllers: [ClientController],
  providers: [ClientService, JobService],
})
export class ClientModule {}
