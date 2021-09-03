import { UpdateDocumentDto } from "./dto/update-document.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, getRepository, Repository } from "typeorm";
import { Document } from "./entities/document.entity";
import uploadFileInAWS from "./aws.service";
import { extname } from "path";
import { arrayMaxSize, Max, maxLength } from "class-validator";

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>
  ) {}

  findAll() {
    return this.documentRepository.find();
  }

  findOne(id: number) {
    return this.documentRepository.findOne(id);
  }

  async getRejectedDocs(userId: any) {
    let rejectedDocs = await getRepository(Document)
      .createQueryBuilder("doc")
      .select(["doc.documentName", "doc.remarks"])
      .where("doc.status IN(:...statusCode)", {
        statusCode: ["RR", "HRR"],
      })
      .andWhere("doc.userId = :uId", { uId: userId })
      .getMany();
    return rejectedDocs;
  }

  async fileNameDocument(userId: string) {
    const firstTimeLogin = await getConnection()
      .createQueryBuilder()
      .select(["d.fileName as fileName", "d.id"])
      .from(Document, "d")
      .where("d.userId=:userId", { userId: userId })
      .orderBy("updatedAt", "DESC")
      .getRawOne();
    return firstTimeLogin;
  }

  async createDocumentInLocal(
    userid: any,
    file: Express.Multer.File,
    docName: string
  ) {
    try {
      const createdDocument = await this.documentRepository.save({
        documentType: file.fieldname,
        documentName: docName,
        description: file.mimetype,
        fileUrl: file.path,
        fileName: file.filename,
        fileExtension: extname(file.originalname),
        userId: userid,
      });
      //one candidate can upload many docs. So we get many document id for one userId. consider the last document id and insert that id into otherdoc table as a foreign key
      const query = getRepository(Document).createQueryBuilder("document");
      query.select("MAX(document.id)", "max");
      const docId = await query.getRawOne();
      return docId.max;
    } catch (error) {
      console.log(error);
    }
  }

  async createDocumentInAWS(
    usrId: any,
    file: Express.Multer.File,
    docName: string
  ) {
    try {
      const { awsFilePath, awsFileName } = await uploadFileInAWS(
        file,
        usrId,
        "document"
      );
      const createdDocument = await this.documentRepository.save({
        documentType: file.fieldname,
        documentName: docName,
        description: file.mimetype,
        fileUrl: awsFilePath,
        fileName: awsFileName,
        fileExtension: extname(file.originalname),
        userId: usrId,
      });
      const query = getRepository(Document).createQueryBuilder("document");
      query.select("MAX(document.id)", "max");
      const docId = await query.getRawOne();
      return docId.max;
    } catch (error) {
      console.log(error);
    }
  }

  async createOfferDocumentInAWS(
    usrId: any,
    file: Express.Multer.File,
    docName: string
  ) {
    try {
      const { awsFilePath, awsFileName } = await uploadFileInAWS(
        file,
        usrId,
        "document"
      );
      const createdOfferDocument = await this.documentRepository.save({
        documentType: file.fieldname,
        documentName: docName,
        description: file.mimetype,
        fileUrl: awsFilePath,
        fileName: awsFileName,
        fileExtension: extname(file.originalname),
        userId: usrId,
      });
      return createdOfferDocument;
    } catch (error) {
      console.log(error);
    }
  }

  async updateDocumentInLocal(
    usrId: any,
    file: Express.Multer.File,
    docId: number
  ) {
    try {
      const updatedDocument = await this.documentRepository.update(
        { userId: usrId, id: docId },
        {
          documentType: file.fieldname,
          description: file.mimetype,
          fileUrl: file.path,
          fileName: file.filename,
          fileExtension: extname(file.originalname),
          status: "U",
          remarks: "",
        }
      );
      return updatedDocument;
    } catch (error) {
      console.log(error);
    }
  }

  async updateDocumentInAWS(
    usrId: any,
    file: Express.Multer.File,
    docId: number
  ) {
    try {
      const { awsFilePath, awsFileName } = await uploadFileInAWS(
        file,
        usrId,
        "document"
      );
      const updatedDocument = await this.documentRepository.update(
        { userId: usrId, id: docId },
        {
          documentType: file.fieldname,
          description: file.mimetype,
          fileUrl: awsFilePath,
          fileName: awsFileName,
          fileExtension: extname(file.originalname),
        }
      );
      //const updatedDoc = await this.updateDocStatusOfAllDocsOfUser(usrId);
      this.changeStatusAfterReupload(docId);
      return updatedDocument;
    } catch (error) {
      console.log(error);
    }
  }

  async updateDocStatusOfAllDocsOfUser(uId: any) {
    const updatedDocument = await this.documentRepository.update(
      { userId: uId },
      {
        status: "U",
        remarks: "",
      }
    );
    return updatedDocument;
  }

  async updateDocStatusByDocId(
    documentId: any,
    updateDocumentDto: UpdateDocumentDto
  ) {
    const { status, remarks } = updateDocumentDto;
    const updateDocStatus = this.documentRepository.update(
      { id: documentId },
      {
        status: status,
        remarks: remarks,
      }
    );

    return updateDocStatus;
  }

  remove(id: number) {
    return this.documentRepository.delete({ id: id });
  }

  async findAllDocsByCandId(userId: string) {
    let rrCount: number = 0;
    let raCount: number = 0;
    const doc = await this.documentRepository.find({
      where: { userId: userId, isActive: 1 },
    });
    await doc.forEach((val) => {
      if (val.status === "RA" || val.status === "HRA") {
        raCount += 1;
      } else if (val.status === "RR") {
        rrCount += 1;
      }
    });
    const docdata = {
      rr: rrCount,
      ra: raCount,
      total: doc.length,
    };

    return docdata;
  }

  async findAllDocsByCandIdforhr(userId: string) {
    let hrrCount: number = 0;
    let hraCount: number = 0;
    const doc = await this.documentRepository.find({
      where: { userId: userId, isActive: 1 },
    });
    await doc.forEach((val) => {
      if (val.status === "HRA") {
        hraCount += 1;
      } else if (val.status === "HRR") {
        hrrCount += 1;
      }
    });
    const docdata = {
      hrr: hrrCount,
      hra: hraCount,
      total: doc.length,
    };

    return docdata;
  }

  async removeDocument(id: number) {
    return await this.documentRepository.update(
      { id: id },
      { isActive: false }
    );
  }

  async getUDocs(userId: string) {
    const docs = await this.documentRepository.find({
      where: { userId: userId, isActive: 1 },
    });
    console.log("Uploaded documents only", docs);
    return docs;
  }

  async changeStatusAfterReupload(id: number) {
    await this.documentRepository.update({ id: id }, { status: "U" });
  }

  async getFileNameByUserIdAndDocName(uId: string, docName: string) {
    let fileName = await getRepository(Document)
      .createQueryBuilder("document")
      .select(["document.fileName"])
      .where("document.userId=:userId", { userId: uId })
      .andWhere("document.documentName=:docName", { docName: docName })
      .getOne();
    return fileName;
  }
}
