import { DocumentService } from "src/document/document.service";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { CreateOtherdocDto } from "./dto/create-otherdoc.dto";
import { Otherdoc } from "./entities/otherdoc.entity";

@Injectable()
export class OtherdocService {
  constructor(
    @InjectRepository(Otherdoc)
    private otherdocRepository: Repository<Otherdoc>,
    private documentService: DocumentService
  ) {}

  findAll() {
    return this.otherdocRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} education`;
  }

  async findDocByUserId(userId: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    let data = await queryRunner.query(`
   SELECT
    c.documentName,
    c.id,
    c.isActive,
    c.description,
    u.userId,

    d.id as documentId,
    d.fileUrl,
    d.fileName,
    d.status as docStatus,
    d.description as fileDescription

    FROM
    otherdoc c

    INNER JOIN user u ON c.userId = u.userId
    LEFT OUTER JOIN document d ON c.documentId = d.id
     where u.userId like '${userId}'`);
    queryRunner.release();
    return data;
  }

  async createOtherDocInLocal(
    usrId: any,
    createOtherdocDto: CreateOtherdocDto,
    file: Express.Multer.File
  ) {
    const docId: any = await this.documentService.createDocumentInLocal(
      usrId,
      file,
      createOtherdocDto.documentName
    );
    const createOtherDoc = await this.otherdocRepository.save({
      documentName: createOtherdocDto.documentName,
      description: createOtherdocDto.description,
      userId: usrId,
      documentId: docId,
    });
    return createOtherDoc;
  }

  async createOtherDocInAWS(
    usrId: any,
    createOtherdocDto: CreateOtherdocDto,
    file: Express.Multer.File
  ) {
    const docId: any = await this.documentService.createDocumentInAWS(
      usrId,
      file,
      createOtherdocDto.documentName
    );
    const createOtherDoc = await this.otherdocRepository.save({
      documentName: createOtherdocDto.documentName,
      description: createOtherdocDto.description,
      userId: usrId,
      documentId: docId,
    });
    return createOtherDoc;
  }

  async updateOtherDocInLocal(
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

  async updateOtherDocInAWS(
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

  remove(id: number) {
    return this.otherdocRepository.delete({ id: id });
  }

  async deactivateDocument(id: number, data: boolean) {
    return await this.otherdocRepository.update(
      { id: id },
      {
        isActive: data,
      }
    );
  }
}
