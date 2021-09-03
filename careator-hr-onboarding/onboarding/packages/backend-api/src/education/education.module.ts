import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { DocumentService } from 'src/document/document.service';
import { Document } from 'src/document/entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education,Document])],
  controllers: [EducationController],
  providers: [EducationService,DocumentService]
})
export class EducationModule {}
