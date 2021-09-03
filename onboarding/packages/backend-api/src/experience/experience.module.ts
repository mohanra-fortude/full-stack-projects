import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { DocumentService } from 'src/document/document.service';
import { Document } from 'src/document/entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Experience]),
    TypeOrmModule.forFeature([Document]),
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService, DocumentService],
})
export class ExperienceModule {}
