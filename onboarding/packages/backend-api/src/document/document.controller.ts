import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { DocumentService } from "./document.service";
import { ApiTags } from "@nestjs/swagger";
import { all_docs } from "./../file-path-constants";
import * as AWS from "aws-sdk";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { UploadDocInAWSInterceptor } from "src/uploadfile";

@ApiTags("Document")
@Controller("document")
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}
  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentService.findOne(+id);
  }

  @Get("rejected-docs/:userId")
  getRejectedDocsByUserId(@Param("userId") userId: any) {
    return this.documentService.getRejectedDocs(userId);
  }

  //get the file from local system
  @Get("doc-file-from-local/:usrId/:fileName")
  async getDocFileFromLocal(
    @Param("usrId") usrId: string,
    @Param("fileName") fileName: string,
    @Res() res: any
  ): Promise<any> {
    return res.sendFile(fileName, {
      root: `${all_docs.DOCS_PATH}/${usrId}`,
    });
  }

  @Get("fileNameDocument/:userId")
  fileNameDocument(@Param("userId") userId: string) {
    return this.documentService.fileNameDocument(userId);
  }

  //get the file from aws
  @Get("doc-file-from-aws/:usrId/:fileName")
  async getDocFileFromAWS(
    @Param("usrId") usrId: string,
    @Param("fileName") fileName: string,
    @Res() res: any
  ): Promise<any> {
    const awsFileKey = `document/${usrId}/${fileName}`;
    const s3 = new AWS.S3();
    const bucketParams = {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: awsFileKey,
    };

    s3.getObject(bucketParams, function (err, data) {
      if (err) {
        return res.json({
          success: false,
          error: err,
        });
      } else {
        res.attachment(awsFileKey);
        s3.getObject(bucketParams).createReadStream().pipe(res);
      }
    });
  }

  @Get("all-docs/:userId")
  findAllDocsByCandId(@Param("userId") userId: string) {
    return this.documentService.findAllDocsByCandId(userId);
  }

  @Get("all-docshr/:userId")
  findAllDocsByCandIdforhr(@Param("userId") userId: string) {
    return this.documentService.findAllDocsByCandIdforhr(userId);
  }

  @Get("u-docs/:userId")
  getUDocs(@Param("userId") userId: string) {
    return this.documentService.getUDocs(userId);
  }

  @Get("file-name/:userId")
  getFileNameOfOfferLetter(@Param("userId") userId: any, @Body() docInfo: any) {
    const { docName } = docInfo;
    return this.documentService.getFileNameByUserIdAndDocName(userId, docName);
  }

  @Patch("update-doc-status/:documentId")
  updateDocByDocId(
    @Param("documentId") documentId: any,
    @Body() updateDocumentDto: UpdateDocumentDto
  ) {
    return this.documentService.updateDocStatusByDocId(
      documentId,
      updateDocumentDto
    );
  }

  @UseInterceptors(UploadDocInAWSInterceptor)
  @Post("upload-offer-letter-to-aws/:userid")
  uploadOtherDocInAWS(
    @Param("userid") userid: any,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.documentService.createOfferDocumentInAWS(
      userid,
      file,
      "offer-letter"
    );
  }
}
