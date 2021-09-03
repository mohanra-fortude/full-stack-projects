import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MailService } from "src/auth/mail/mail.service";
import { Candidate } from "src/candidate/entities/candidate.entity";
import { Repository, getRepository } from "typeorm";
import { CreateAssetDto } from "./dto/create-asset.dto";
import { UpdateAssetDto } from "./dto/update-asset.dto";
import { Asset } from "./entities/asset.entity";
@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset) private assetRepository: Repository<Asset>,
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    private mailService: MailService
  ) {}

  async create(uid: any, createAssetsDto: CreateAssetDto) {
    try {
      const {
        model,
        processorType,
        ram,
        storageType,
        storageSpace,
        isActive,
        createdBy,
        updatedBy,
        userId,
      } = createAssetsDto;
      return this.assetRepository.save({
        model,
        processorType,
        ram,
        storageType,
        storageSpace,
        isActive,
        createdBy,
        updatedBy,

        userId: userId,
      });
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }

  findAll() {
    return this.assetRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  async getAssetDetailsByUserId(uId: string) {
    let assetRow = await getRepository(Asset)
      .createQueryBuilder("asset")
      .select([
        "asset.model",
        "asset.processorType",
        "asset.ram",
        "asset.storageType",
        "asset.storageSpace",
      ])
      .where("asset.userId=:userId", { userId: uId })
      .getOne();
    return assetRow;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }

  async sendAssetMailToAdmin(uid: any) {
    try {
      var assetData = await this.assetRepository.findOne({
        where: { userId: uid },
      });
      var candData = await this.candidateRepository.findOne({
        where: { userId: uid },
      });
      await this.mailService.sendAssetEmailToAdmin(assetData, candData);
      return assetData;
    } catch (e) {
      console.log(e);
    }
  }
}
