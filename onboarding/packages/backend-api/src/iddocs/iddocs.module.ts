import { DocumentService } from "./../document/document.service";
import { Module } from "@nestjs/common";
import { IddocsService } from "./iddocs.service";
import { IddocsController } from "./iddocs.controller";
import { UserService } from "src/auth/user/user.service";
import { UserEntity } from "src/auth/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Iddoc } from "./entities/iddoc.entity";
import { Document } from "src/document/entities/document.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([Iddoc]), TypeOrmModule.forFeature([Document]),
  ],
  controllers: [IddocsController],
  providers: [IddocsService, DocumentService],
})
export class IddocsModule {}
