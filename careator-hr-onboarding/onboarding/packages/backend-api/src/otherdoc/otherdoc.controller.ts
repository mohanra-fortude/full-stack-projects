import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Patch,
  Delete,
} from "@nestjs/common";
import { OtherdocService } from "./otherdoc.service";
import { CreateOtherdocDto } from "./dto/create-otherdoc.dto";
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
  UploadDocInLocalInterceptor,
  UploadDocInAWSInterceptor,
} from "src/uploadfile";
@ApiTags("OtherDocs")
@Controller("otherdoc")
export class OtherdocController {
  constructor(private readonly otherdocService: OtherdocService) {}

  @Get()
  findAll() {
    return this.otherdocService.findAll();
  }

  @ApiNotFoundResponse({ description: "No data is found for the specified ID" })
  @ApiOkResponse({ description: "otherdoc Data found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.otherdocService.findOne(+id);
  }

  @Get("DocByUserId/:userId")
  findDocByUserId(@Param("userId") userId: string) {
    return this.otherdocService.findDocByUserId(userId);
  }

  //file posted gets stored in local system in folder named user-files/documents/{userId}
  @UseInterceptors(UploadDocInLocalInterceptor)
  @Post("upload-other-doc-to-local/:userid")
  uploadOtherDocInLocal(
    @Param("userid") userid: string,
    @Body() createOtherdocDto: CreateOtherdocDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.otherdocService.createOtherDocInLocal(
      userid,
      createOtherdocDto,
      file
    );
  }

  //the file posted gets stored in AWS
  @UseInterceptors(UploadDocInAWSInterceptor)
  @Post("upload-other-doc-to-aws/:usrId")
  uploadOtherDocInAWS(
    @Param("usrId") usrId: any,
    @Body() createOtherdocDto: CreateOtherdocDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.otherdocService.createOtherDocInAWS(
      usrId,
      createOtherdocDto,
      file
    );
  }

  //update the file in local system
  @UseInterceptors(UploadDocInLocalInterceptor)
  @Patch("update-other-doc-in-local/:userid/:fileName")
  updateOtherDocInLocal(
    @Param("userid") userid: any,
    @Param("docId") docId: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.otherdocService.updateOtherDocInLocal(userid, file, docId);
  }

  //update the file in AWS
  @UseInterceptors(UploadDocInAWSInterceptor)
  @Patch("update-other-doc-in-aws/:userid/:docId")
  updateOtherDocInAWS(
    @Param("userid") userid: any,
    @Param("docId") docId: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.otherdocService.updateOtherDocInAWS(userid, file, docId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.otherdocService.remove(+id);
  }

  @Patch("deactivate/:id")
  deactivateDocument(@Param("id") id: number, @Body() data: boolean) {
    return this.otherdocService.deactivateDocument(id, data);
  }
}
