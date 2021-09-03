import { DocumentService } from "./../document/document.service";
import { Iddoc } from "./entities/iddoc.entity";
import { Injectable } from "@nestjs/common";
import { CreateIddocDto } from "./dto/create-iddoc.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";

@Injectable()
export class IddocsService {
  constructor(
    @InjectRepository(Iddoc)
    private iddocRepository: Repository<Iddoc>,
    private documentService: DocumentService
  ) {}
  findAll() {
    return this.iddocRepository.find();
  }

  findOne(id: number) {
    return this.iddocRepository.findOne(id);
  }

  async findIddocsByUserId(userId: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    let data = await queryRunner.query(`
     SELECT
    c.documentName,
    c.description,
    c.id,
    c.isActive,
    u.userId,

    d.id as documentId,
    d.fileUrl,
    d.fileName,
    d.status as docStatus,
    d.description as fileDescription

    FROM
    iddocs c

    INNER JOIN user u ON c.userId = u.userId
    LEFT OUTER JOIN document d ON c.documentId = d.id

     where u.userId like '${userId}' and c.isActive = 1`);

    queryRunner.release();

    return data;
  }

  async createIdDocInLocal(
    usrId: any,
    createIddocDto: CreateIddocDto,
    file: Express.Multer.File
  ) {
    const docId: any = await this.documentService.createDocumentInLocal(
      usrId,
      file,
      createIddocDto.documentName
    );
    const createIdDoc = await this.iddocRepository.save({
      documentName: createIddocDto.documentName,
      description: createIddocDto.description,
      userId: usrId,
      documentId: docId,
    });
    return createIdDoc;
  }

  async createIdDocInAWS(
    usrId: any,
    createIddocDto: CreateIddocDto,
    file: Express.Multer.File
  ) {
    const docId: any = await this.documentService.createDocumentInAWS(
      usrId,
      file,
      createIddocDto.documentName
    );
    const createIdDoc = await this.iddocRepository.save({
      documentName: createIddocDto.documentName,
      description: createIddocDto.description,
      userId: usrId,
      documentId: docId,
    });
    return createIdDoc;
  }

  async updateIdDocInLocal(
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

  async updateIdDocInAWS(usrId: any, file: Express.Multer.File, docId: number) {
    const updatedDoc = this.documentService.updateDocumentInAWS(
      usrId,
      file,
      docId
    );
    return updatedDoc;
  }

  remove(id: number) {
    return this.iddocRepository.delete({ id: id });
  }

  async deactivateDocument(id: number, data: boolean) {
    const basic =  await this.iddocRepository.update(
      { id: id },
      {
        isActive: data,
      }
    );
    const docId = await this.iddocRepository.findOne({
      where: { id: id},
      relations: ["documentId"]
    });
   const docChange = await this.documentService.removeDocument(docId.documentId.id);
   return basic;
  }
}
