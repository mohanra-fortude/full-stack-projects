import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AssetService } from "./asset.service";
import { CreateAssetDto } from "./dto/create-asset.dto";
import { UpdateAssetDto } from "./dto/update-asset.dto";

@ApiTags("Asset")
@Controller("asset")
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  create(@Request() req: any, @Body() createAssetDto: CreateAssetDto) {
    return this.assetService.create(req, createAssetDto);
  }

  @Get()
  findAll() {
    return this.assetService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.assetService.findOne(+id);
  }

  @Get("asset-details/:uId")
  findOneByUserId(@Param("uId") uId: string) {
    return this.assetService.getAssetDetailsByUserId(uId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetService.update(+id, updateAssetDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.assetService.remove(+id);
  }

  @Get("assetToAdmin/:uid")
  sendAssetMailToAdmin(@Param("uid") uid: any) {
    return this.assetService.sendAssetMailToAdmin(uid);
  }
}
