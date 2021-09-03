import { UpdateExperienceDto } from "./dto/update-experience.dto";
import { getConnection } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { Experience } from "./entities/experience.entity";
import { DocumentService } from "src/document/document.service";

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
    private documentService: DocumentService
  ) {}

  findAll() {
    return `This action returns all experience`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experience`;
  }

  async findDocByUserId(userId: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    let data = await queryRunner.query(`
    SELECT
	e.employer,
    e.startDate,
    e.completionDate,
    e.designation,
    e.isActive,
    e.location,
    e.ctc,
    e.skills,
    e.id,

    e.documentId,
       d.id as documentId,
    d.fileUrl,
    d.fileName,
    d.status as docStatus,
    d.description,

    u.userId


    FROM
    experience e
    INNER JOIN user u ON e.userId = u.userId
    LEFT OUTER JOIN document d ON e.documentId = d.id
    where u.userId like '${userId}' and e.isActive = 1`);

    queryRunner.release();
    return data;
  }

  async createExperienceDocInLocal(
    userid: any,
    createExperienceDto: CreateExperienceDto,
    file: Express.Multer.File
  ) {
    const docId: any = await this.documentService.createDocumentInLocal(
      userid,
      file,
      createExperienceDto.employer
    );
    const createExperienceDoc = await this.experienceRepository.save({
      employer: createExperienceDto.employer,
      startDate: createExperienceDto.startDate,
      completionDate: createExperienceDto.completionDate,
      designation: createExperienceDto.designation,
      ctc: createExperienceDto.ctc,
      location: createExperienceDto.location,
      skills: createExperienceDto.skills,
      isActive: createExperienceDto.isActive,
      userId: userid,
      documentId: docId,
    });
    return createExperienceDoc;
  }

  async createExperienceDocInAWS(
    userid: any,
    createExperienceDto: CreateExperienceDto,
    file: Express.Multer.File
  ) {
    const docid: any = await this.documentService.createDocumentInAWS(
      userid,
      file,
      createExperienceDto.employer
    );
    const createExperienceDoc = await this.experienceRepository.save({
      employer: createExperienceDto.employer,
      startDate: createExperienceDto.startDate,
      completionDate: createExperienceDto.completionDate,
      designation: createExperienceDto.designation,
      ctc: createExperienceDto.ctc,
      location: createExperienceDto.location,
      skills: createExperienceDto.skills,
      isActive: createExperienceDto.isActive,
      userId: userid,
      documentId: docid,
    });
    return createExperienceDoc;
  }

  async updateExperienceDocInLocal(
    usrId: any,
    file: Express.Multer.File,
    docId: number
  ) {
    const updatedDoc = this.documentService.updateDocumentInLocal(
      usrId,
      file,
      docId
    );
    return updatedDoc;
  }

  async updateExperienceDocInAWS(
    usrId: any,
    file: Express.Multer.File,
    docId: number
  ) {
    const updatedDoc = this.documentService.updateDocumentInAWS(
      usrId,
      file,
      docId
    );
    return updatedDoc;
  }

  async remove(id: number) {
    const exp = await this.experienceRepository.update({ id: id }, { isActive: false });
    const docId = await this.experienceRepository.findOne({
      where: { id: id},
      relations: ["documentId"]
   });
   const docChange = await this.documentService.removeDocument(docId.documentId.id);

   return exp;
  }
}
