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
} from "@nestjs/common";
import { EducationService } from "./education.service";
import { CreateEducationDto } from "./dto/create-education.dto";
import {
  UploadDocInLocalInterceptor,
  UploadDocInAWSInterceptor,
} from "src/uploadfile";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Education")
@Controller("education")
export class EducationController {
  constructor(private readonly educationService: EducationService) {}
  @Get()
  findAll() {
    return this.educationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.educationService.findOne(+id);
  }

  @Get("educationDetails/:userId")
  findRoleByUserId(@Param("userId") userId: string) {
    return this.educationService.findUserByUserId(userId);
  }

  @UseInterceptors(UploadDocInLocalInterceptor)
  @Post("upload-education-doc-to-local/:userid")
  uploadEductionDocInLocal(
    @Param("userid") userid: any,
    @Body() createEducationDto: CreateEducationDto,
    @UploadedFile() file: Express.Multer.File
  ) {    
    return this.educationService.createEducationDocInLocal(
      userid,
      createEducationDto,
      file
    );
  }

  @UseInterceptors(UploadDocInAWSInterceptor)
  @Post("upload-education-doc-to-aws/:userid")
  uploadOtherDocInAWS(
    @Param("userid") userid: any,
    @Body() createEducationDto: CreateEducationDto,
    @UploadedFile() file: Express.Multer.File
  ) {   
    return this.educationService.createEducationDocInAWS(
      userid,
      createEducationDto,
      file
    );
  }

  @UseInterceptors(UploadDocInLocalInterceptor)
  @Patch("update-education-doc-in-local/:userid/:docId")
  updateOtherDocInLocal(
    @Param("userid") userid: any,
    @Param("docId") docId: number,
    @UploadedFile() file: Express.Multer.File
  ) {   
    return this.educationService.updateEducationDocInLocal(
      userid,
      file,
      docId
    );
  }

  //update the file in AWS
  @UseInterceptors(UploadDocInAWSInterceptor)
  @Patch("update-education-doc-in-aws/:userid/:docId")
  updateOtherDocInAWS(
    @Param("userid") userid: any,
    @Param("docId") docId: number,
    @UploadedFile() file: Express.Multer.File
  ) {    
    return this.educationService.updateEducationDocInAWS(
      userid,
      file,
      docId
    );
  }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.educationService.remove(+id);
    }
}
