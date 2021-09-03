import { Module } from "@nestjs/common";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";
import { Offer } from "./entities/offer.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentService } from "src/document/document.service";
import { Document } from "src/document/entities/document.entity";
import { MailService } from "src/auth/mail/mail.service";
import { MailModule } from "src/auth/mail/mail.module";

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Document])],
  controllers: [OfferController],
  providers: [OfferService, DocumentService, MailService],
  exports: [DocumentService],
})
export class OfferModule {}
