import { Module } from "@nestjs/common";
import { OtherdocService } from "./otherdoc.service";
import { OtherdocController } from "./otherdoc.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Otherdoc } from "./entities/otherdoc.entity";
import { DocumentService } from "src/document/document.service";
import { Document } from "src/document/entities/document.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Otherdoc]),
    TypeOrmModule.forFeature([Document]),
  ],
  controllers: [OtherdocController],
  providers: [OtherdocService, DocumentService],
})
export class OtherdocModule {}
