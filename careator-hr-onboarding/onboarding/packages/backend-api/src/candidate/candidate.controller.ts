import { Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "src/auth/user/user.service";
import { CandidateService } from "./candidate.service";
import { CreateCandidateDto } from "./dto/create-candidate.dto";
import { UpdateCandidateDto } from "./dto/update-candidate.dto";
import { UpdateCandidateStatusDto } from "./dto/update-candidateStatus.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@ApiTags("Candidate")
@Controller("candidate")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class CandidateController {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly userService: UserService
  ) {}

  @Get("candidateInfo/:userId")
  findCandidateDetails(@Param("userId") userId: string) {
    return this.candidateService.candidateInfo(userId);
  }

  @Get("findCandidate/:userId")
  findCandByUserId(@Param("userId") userId: string) {
    return this.candidateService.findCandByUserId(userId);
  }

  @Get("count")
  findCandidateDocReviewdDocCount(@Query("RecruiterID") RecruiterID: string) {
    return this.candidateService.findCandidateDocReviewdDocCount(RecruiterID);
  }

  @Get("candidateCount")
  findCandidateAllCount(@Query("recruiterIds") recruId: string) {
    return this.candidateService.findCandidateAllCount(recruId);
  }

  @Get("pagination")
  findAll(@Query("page") page: number = 1, @Query("size") size: number = 2) {
    return this.candidateService.findAll(page, size);
  }

  @Get("recruiter/:id")
  findByRecruiterId(@Query("id") id: string) {
    return this.candidateService.findByRecuiterId(id);
  }

  @Get()
  findByQueryAndSort(
    @Query("q") query: string = "",
    @Query("f") field: string,
    @Query("o") order: string,
    @Query("status") status: string = "",
    @Query("rid") rid: string = ""
  ) {
    return this.candidateService.findByQueryAndSort(
      query,
      field,
      order,
      status,
      rid
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.candidateService.findOne(+id);
  }

  @Get("findOneCandidate/:id")
  findOneCandidate(@Param("id") id: string) {
    return this.candidateService.findCandidateByUserId(id);
  }

  @Get("findRecruiters/:uid")
  getRectruitersByUserId(@Param("uid") uid: string) {
    return this.candidateService.getRectruitersByUserId(uid);
  }

  @Get("candidate-by-userId/:userId")
  findRoleByUserId(@Param("userId") userId: string) {
    return this.candidateService.getCandidateDetailsByUserId(userId);
  }

  @Get("test")
  findOneName(@Query() candiId: string) {
    return this.candidateService.findOneName(candiId);
  }

  @Get("getEmailByuserId/:userId")
  getEmailByuserId(@Param("userId") userId: string) {
    return this.candidateService.getEmailByuserId(userId);
  }
  @Get("getEmailForRemarks/:userId")
  getEmailForRemarks(@Param("userId") userId: string) {
    return this.candidateService.getEmailByCandidateuserId(userId);
  }
  @Get("getStatusByCandidateuserId/:userId")
  getStatusByCandidateuserId(@Param("userId") userId: string) {
    return this.candidateService.getStatusByCandidateuserId(userId);
  }

  @Get("candidateAndRecuiter/:userId")
  findCandidateAndRecuiter(@Param("userId") userId: string) {
    return this.candidateService.findCandidateAndRecuiter(userId);
  }

  @Get("notification/:userId")
  findnotification(@Param("userId") userId: string) {
    return this.candidateService.getNotifiByCuserId(userId);
  }

  @Get("count-of-candidates-under-recruiter/:recruiterId")
  findCandCountByRecId(@Param("recruiterId") recruiterId: string) {
    return this.candidateService.getCandidateCountForRecuiter(recruiterId);
  }

  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.userService.createUserCandidate(createCandidateDto);
  }

  @Patch("changeRecruiter")
  updateRecruiter(@Query("suid") suid: string, @Query("auid") auid: string) {
    return this.candidateService.updateRecruiter(suid, auid);
  }

  @Patch(":id")
  updateCandidate(
    @Param("id") id: string,
    @Body() updateCandidateDto: UpdateCandidateDto
  ) {
    return this.userService.updateCandidateByRecruiter(id, updateCandidateDto);
  }

  @Put("update")
  update(@Body() updateCandidateDto: CreateCandidateDto) {
    return this.candidateService.update(updateCandidateDto);
  }

  @Patch("activestate/:id")
  remove(
    @Param("id") id: string,
    @Body() updateCandidateDto: UpdateCandidateDto
  ) {
    return this.userService.deleteUser(id, updateCandidateDto);
  }

  @Patch("updatestatuscode/:userId")
  updateCandidateStatusCode(
    @Param("userId") userId: string,
    @Body() status: UpdateCandidateStatusDto
  ) {
    return this.candidateService.updateStatusCode(
      userId,
      status.statusCode,
      status.description,
      status.emailTo,
      status.emailFrom,
      status.subject
    );
  }

  @Patch("sendEmailAndChangeStatus/:userId")
  sendEmailAndChangeStatus(
    @Param("userId") userId: string,
    @Body() status: UpdateCandidateStatusDto
  ) {
    return this.candidateService.sendEmailAndChangeStatus(
      userId,
      status.statusCode,
      status.subject,
      status.description,
      status.emailTo,
      status.emailFrom,
      status.cc,
      status.emailDataToSent
    );
  }

  @Post("send-offer-email/:userId")
  sendOfferEmailToCandidate(
    @Param("userId") userId: string,
    @Body() mailData: any
  ) {
    return this.candidateService.sendEmailOfferLetterToCandiate(
      userId,
      mailData
    );
  }

  @Patch("sendEmailOffer/:userId")
  sendEmailOffer(
    @Param("userId") userId: string,
    @Body() status: UpdateCandidateStatusDto
  ) {
    return this.candidateService.sendEmailOffer(
      userId,
      status.statusCode,
      status.subject,
      status.description,
      status.emailFrom,
      status.emailTo,
      status.mailData,
      status.userId1
    );
  }

  @Patch("change-status/:userId/:statusCode")
  updateCandidateStatus(
    @Param("userId") userId: any,
    @Param("statusCode") statusCode: any
  ) {
    console.log("user id is ", userId);
    return this.candidateService.updateCandStatusByUserID(userId, statusCode);
  }

  @Patch("updatestatuscodeandleader/:userId")
  updateCandidateStatusCodeAndLeader(
    @Param("userId") userId: string,
    @Body() status: UpdateCandidateStatusDto
  ) {
    return this.candidateService.updateStatusCodeAndLeader(
      userId,
      status.leaderId,
      status.statusCode,
      status.description,
      status.emailTo,
      status.emailFrom,
      status.subject
    );
  }

  @Patch("updateRecruiters/:oldrec")
  updateCandidateToNewRecruiter(
    @Param("oldrec") oldrec: any,
    @Body() data: any
  ) {
    console.log("old and new rec", data.newrec, oldrec);
    return this.candidateService.updateCandidateToNewRec(oldrec, data.newrec);
  }
}
