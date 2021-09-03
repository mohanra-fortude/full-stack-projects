import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentService } from "src/document/document.service";
import { getConnection, Repository } from "typeorm";
import { CreateEducationDto } from "./dto/create-education.dto";
import { UpdateEducationDto } from "./dto/update-education.dto";
import { Education } from "./entities/education.entity";

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private eductionRepository: Repository<Education>,
    private documentService: DocumentService
  ) {}
  async findUserByUserId(userId: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    let data = await queryRunner.query(`
    SELECT

     c.institute,
     c.startDate,
     c.completionDate,
	 c.degree,
     c.subjects,
	 c.isActive,
     c.grade,
     c.id,
    u.userId,
    d.id as documentId,
    d.status as docStatus,
    d.fileUrl,
    d.fileName,
    d.description

    FROM
    education c
    INNER JOIN user u ON c.userId = u.userId
    LEFT OUTER JOIN document d ON c.documentId = d.id
    where u.userId like '${userId}' and c.isActive = 1 ORDER BY c.startDate ASC`);

    queryRunner.release();

    return data;
  }

  async createEducationDocInLocal(
    userid: any,
    createEducationDto: CreateEducationDto,
    file: Express.Multer.File
  ) {
    const { institute, startDate, completionDate, degree, grade, subjects } =
      createEducationDto;
    const docId: any = await this.documentService.createDocumentInLocal(
      userid,
      file,
      degree
    );
    const createEducationDoc = await this.eductionRepository.save({
      institute: institute,
      startDate: startDate,
      completionDate: completionDate,
      degree: degree,
      grade: grade,
      subjects: subjects,
      userId: userid,
      documentId: docId,
    });
    return createEducationDoc;
  }

  async createEducationDocInAWS(
    userid: any,
    createEducationDto: CreateEducationDto,
    file: Express.Multer.File
  ) {
    const { institute, startDate, completionDate, degree, grade, subjects } =
      createEducationDto;
    const docId: any = await this.documentService.createDocumentInAWS(
      userid,
      file,
      degree
    );
    const createEducationDoc = await this.eductionRepository.save({
      institute: institute,
      startDate: startDate,
      completionDate: completionDate,
      degree: degree,
      grade: grade,
      subjects: subjects,
      userId: userid,
      documentId: docId,
    });
    return createEducationDoc;
  }

  async updateEducationDocInLocal(
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

  async updateEducationDocInAWS(
    usrId: any,
    file: Express.Multer.File,
    docId: number
  ) {
    const updatedDoc = await this.documentService.updateDocumentInAWS(
      usrId,
      file,
      docId
    );
    return updatedDoc;
  }

  findAll() {
    return this.eductionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} education`;
  }

  async remove(id: number) {
    const edu = await this.eductionRepository.update({ id: id }, { isActive: false });
    const docId = await this.eductionRepository.findOne({
       where: { id: id},
       relations: ["documentId"]
    });
    const docChange = await this.documentService.removeDocument(docId.documentId.id);

    return edu;
  }
}
