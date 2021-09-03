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
  Query,
} from "@nestjs/common";
import { ExperienceService } from "./experience.service";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import {
  UploadDocInLocalInterceptor,
  UploadDocInAWSInterceptor,
} from "src/uploadfile";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Experience")
@Controller("experience")
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}
  @Get()
  findAll() {
    return this.experienceService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.experienceService.findOne(+id);
  }

  @Get("docByuserId/:userId")
  findDocByUserId(@Param("userId") userId: string) {
    return this.experienceService.findDocByUserId(userId);
  }

  @UseInterceptors(UploadDocInLocalInterceptor)
  @Post("upload-experience-doc-to-local/:userid")
  uploadExperienceDocInLocal(
    @Param("userid") userid: any,
    @Body() createExperienceDto: CreateExperienceDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.experienceService.createExperienceDocInLocal(
      userid,
      createExperienceDto,
      file
    );
  }

  @UseInterceptors(UploadDocInAWSInterceptor)
  @Post("upload-experience-doc-to-aws/:userid")
  uploadExperienceDocInAWS(
    @Param("userid") userid: any,
    @Body() createExperienceDto: CreateExperienceDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.experienceService.createExperienceDocInAWS(
      userid,
      createExperienceDto,
      file
    );
  }

  //update the file in local system
  @UseInterceptors(UploadDocInLocalInterceptor)
  @Patch("update-experience-doc-in-local/:userid/:docId")
  updateOtherDocInLocal(
    @Param("userid") userid: any,
    @Param("docId") docId: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.experienceService.updateExperienceDocInLocal(
      userid,
      file,
      docId
    );
  }

  //update the file in AWS
  @UseInterceptors(UploadDocInAWSInterceptor)
  @Patch("update-experience-doc-in-aws/:userid/:docId")
  updateOtherDocInAWS(
    @Param("userid") userid: any,
    @Param("docId") docId: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.experienceService.updateExperienceDocInAWS(userid, file, docId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.experienceService.remove(+id);
  }
}
