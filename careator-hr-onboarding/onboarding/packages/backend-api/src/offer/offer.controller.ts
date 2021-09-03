import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { OfferService } from "./offer.service";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { ApiTags } from "@nestjs/swagger";
import { Query } from "@nestjs/common";
import {
  UploadDocInAWSInterceptor,
  UploadDocInLocalInterceptor,
} from "src/uploadfile";

@ApiTags("Offer")
@Controller("offer")
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  create(@Request() req: any, @Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(req, createOfferDto);
  }

  @Get("findOneCandidate/:id")
  findOneCandidatedetails(@Param("id") id: string) {
    return this.offerService.findCandidateDetailsByUserId(id);
  }

  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Get("user")
  findMangerEmailFromUserID(@Query("userid") userid: string) {
    return this.offerService.findMangerEmailFromUserID(userid);
  }

  @Get("offer/:uid")
  getAll(@Param("uid") uid: string) {
    return this.offerService.getOfferById(uid);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.offerService.findOne(+id);
  }

  @Patch("offer/:uid")
  update(@Param("uid") uid: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(uid, updateOfferDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.offerService.remove(+id);
  }

  @Get("assetToAdmin/:uid")
  sendAssetMailToAdmin(@Param("uid") uid: any) {
    return this.offerService.sendAssetMailToAdmin(uid);
  }
}
