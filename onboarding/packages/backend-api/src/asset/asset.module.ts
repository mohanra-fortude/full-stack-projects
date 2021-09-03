import { Module } from "@nestjs/common";
import { AssetService } from "./asset.service";
import { AssetController } from "./asset.controller";
import { Asset } from "./entities/asset.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailService } from "src/auth/mail/mail.service";
import { Candidate } from "src/candidate/entities/candidate.entity";
@Module({
  imports: [TypeOrmModule.forFeature([Asset, Candidate])],
  controllers: [AssetController],
  providers: [AssetService, MailService],
})
export class AssetModule {}
