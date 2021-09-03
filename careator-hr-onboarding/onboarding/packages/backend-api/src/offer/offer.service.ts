import { Injectable } from "@nestjs/common";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { UserService } from "src/auth/user/user.service";
import { Offer } from "./entities/offer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { DocumentService } from "../document/document.service";
import { UserEntity } from "src/auth/entities/user.entity";
import { MailService } from "src/auth/mail/mail.service";
import { response } from "express";
@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private userService: UserService,
    private documentService: DocumentService,
    private mailService: MailService
  ) {}

  async create(uid: any, createOfferDto: CreateOfferDto) {
    //const user = await this.userService.findById(uid);

    try {
      // const user = await this.userService.findById(uid);
      const {
        offerStatus,
        bgv,
        pf,
        insurance,
        modeOfEmp,
        hireDate,
        workStartDate,
        rate,
        ctc,
        location,
        designation,
        client,
        assetType,
        isActive,
        userId,
        createdBy,
        updatedBy,
      } = createOfferDto;
      return this.offerRepository.save({
        offerStatus,
        bgv,
        pf,
        insurance,
        modeOfEmp,
        hireDate,
        workStartDate,
        rate,
        ctc,
        location,
        designation,
        client,
        assetType,
        isActive,
        userId: userId,
        createdBy,
        updatedBy,
      });
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }

  async findCandidateDetailsByUserId(id: string) {
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();
    // now we can execute any queries on a query runner, for example:
    let data = await queryRunner.query(`
        SELECT
        c.location,
      c.createdAt,
        c.insurance,
    case  when c.releaseNumber is not null then c.releaseNumber else ifNull(max(c.releaseNumber),123456)+1 end as releaseNumber,
      c.pf,	  
      c.modeOfEmp,
        c.ctc as D5,
        round(c.ctc/12,2) as D6,
        ROUND(c.ctc/12*0.4,2) as D9,
        ROUND(c.ctc/12*0.4,2)as D10,
        1600 as D11,
        1250 as D12,
        1800 as D13,
        Round(c.ctc/12,2) - round(c.ctc/12*0.4,2) + case when c.pf = 1 then 1800 else 0 end as D14,
        Round(c.ctc/12,2) - round(c.ctc/12*0.4,2) + case when c.pf = 1 then 1800 else 0 end + ROUND(c.ctc/12*0.4,2) as D15 ,
        200 as D18,
        case when c.pf  = 1 then 3600 else 0 end as D19,
        case when c.insurance = 1 then 600 else 0 end as D20,
        200+case when c.pf  = 1 then 3600 else 0 end +  case when c.insurance = 1 then 600 else 0 end as D21,
        Round(c.ctc/12,2) - round(c.ctc/12*0.4,2) + case when c.pf = 1 then 1800 else 0 end + ROUND(c.ctc/12*0.4,2)-200+case when c.pf  = 1 then 3600 else 0 end +  case when c.insurance = 1 then 600 else 0 end as D23,
        
        c.designation,
        date_format(c.workStartDate,'%d/%m/%Y') as workStartDate,
        c.client,
        c.id as offerid,
        
        u.email,
        u.mobile ,
        u.userId ,
        
        p.firstName,
        p.statusCode,
        p.id,
        CONCAT(p.firstName, " " ,p.lastName) AS 'fullName',
        p.lastName,
        p.panCard
        
        FROM
        offer c
        INNER JOIN user u ON c.userId = u.userId
        INNER JOIN candidate p ON c.userId = p.userId
        
         where u.userId like '${id}'`);

    queryRunner.release();
    return data;
  }

  async findMangerEmailFromUserID(userID: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // now we can execute any queries on a query runner, for example:

    let data: any;
    data = await queryRunner.query(`
                  select u.email,e.firstName,e.lastName from user u
		  INNER JOIN employee e ON u.userId = e.userId
          where u.userid like (
            select managerid from employee e where userId='${userID}');
      `);
    queryRunner.release();
    return data;
  }

  findAll() {
    return this.offerRepository.find();
  }

  async findAll1(uid: string) {
    const data = await this.offerRepository.findOne(uid);
    return data;
  }

  async getOfferById(uid: string) {
    const offerData = await getConnection()
      .createQueryBuilder()
      // .select("Offer")
      .from(Offer, "o")
      .where("o.userId = :uid", { uid: uid })
      .getRawOne();
    return offerData;
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(userId: any, updateOfferDto: UpdateOfferDto) {
    return this.offerRepository.update(
      { userId: userId },
      { ...updateOfferDto }
    );
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }

  async sendAssetMailToAdmin(uid: any) {
    try {
      var data = this.offerRepository.findOne({ where: { userId: uid } });
      return Promise.resolve((await data).assetType);
    } catch (e) {
      console.log(e);
    }
  }
}
