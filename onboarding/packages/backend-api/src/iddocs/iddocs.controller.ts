import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from "@nestjs/common";
import { IddocsService } from "./iddocs.service";
import { CreateIddocDto } from "./dto/create-iddoc.dto";
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
  UploadDocInLocalInterceptor,
  UploadDocInAWSInterceptor,
} from "src/uploadfile";

@ApiTags("Basic Id Docs")
@Controller("iddoc")
export class IddocsController {
  constructor(private readonly iddocsService: IddocsService) {}
  @Get()
  findAll() {
    return this.iddocsService.findAll();
  }

  @ApiNotFoundResponse({ description: "No data is found for the specified ID" })
  @ApiOkResponse({ description: "Basic iddoc Data found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.iddocsService.findOne(+id);
  }

  @Get("docImage/:id")
  async serveAvatar(@Param("fileId") documentid, @Res() res): Promise<any> {
    return res.sendFile(documentid, { root: "./../user-files/Document" });
  }

  @Get("DocsByUserId/:userId")
  findDocByUserId(@Param("userId") userId: string) {
    return this.iddocsService.findIddocsByUserId(userId);
  }

  //file posted gets stored in local system in folder named user-files/documents/{userId}
  @UseInterceptors(UploadDocInLocalInterceptor)
  @Post("upload-id-doc-to-local/:userid")
  uploadIdDocInLocal(
    @Param("userid") userid: any,
    @Body() createIddocDto: CreateIddocDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.iddocsService.createIdDocInLocal(userid, createIddocDto, file);
  }

  //the file posted gets stored in AWS
  @UseInterceptors(UploadDocInAWSInterceptor)
  @Post("upload-id-doc-to-aws/:userid")
  uploadIdDocInAWS(
    @Param("userid") userid: any,
    @Body() createIddocDto: CreateIddocDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.iddocsService.createIdDocInAWS(userid, createIddocDto, file);
  }

  //update the file in local system
  @UseInterceptors(UploadDocInLocalInterceptor)
  @Patch("update-id-doc-in-local/:userid/:docId")
  updateOtherDocInLocal(
    @Param("userid") userid: any,
    @Param("docId") docId: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.iddocsService.updateIdDocInLocal(userid, file, docId);
  }

  //update the file in AWS
  @UseInterceptors(UploadDocInAWSInterceptor)
  @Patch("update-id-doc-in-aws/:userid/:docId")
  updateOtherDocInAWS(
    @Param("userid") userid: any,
    @Param("docId") docId: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.iddocsService.updateIdDocInAWS(userid, file, docId);
  }

  @Patch("deactivate/:id")
  deactivateDocument(@Param("id") id: number, @Body() data: boolean) {
    return this.iddocsService.deactivateDocument(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.iddocsService.remove(+id);
  }
}
