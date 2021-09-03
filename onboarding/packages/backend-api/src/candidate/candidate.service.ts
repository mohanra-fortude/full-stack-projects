import { Workflow } from "../workflow/entities/workflow.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressService } from "../address/address.service";
import { CreateAddressDto } from "../address/dto/create-address.dto";
import { Address } from "../address/entities/address.entity";
import { UserEntity } from "../auth/entities/user.entity";
import { getConnection, Repository, getRepository } from "typeorm";
import { Candidate } from "./entities/candidate.entity";
import { Notification } from "../notification/entities/notification.entity";
import { mailSubject } from "../mailsubject-constants";
import { MailService } from "../auth/mail/mail.service";
import { Employee } from "../employees/entities/employee.entity";
import { WorkflowService } from "src/workflow/workflow.service";

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    @InjectRepository(Workflow)
    private workflowRepo: Repository<Workflow>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private addressService: AddressService,
    @InjectRepository(Notification)
    private notifyRepository: Repository<Notification>,
    private mailService: MailService
  ) {}

  async update(updateCandidateDto: any) {
    const {
      userId,
      fname,
      lname,
      bloodGroup,
      allergies,
      emergencyPhone,
      emergencyEmail,
      emergencyContactName,
      parentLastName,
      parentMiddleName,
      parentFirstName,
      aadhaarCard,
      passport,
      panCard,
      dateBirth,
      gender,
      homePhone,
      middleName,
    } = updateCandidateDto;

    var candDto = {
      firstName: fname,
      lastName: lname,
      bloodGroup: bloodGroup,
      emergencyPhone: emergencyPhone,
      emergencyEmail: emergencyEmail,
      emergencyContactName: emergencyContactName,
      parentLastName: parentLastName,
      parentMiddleName: parentMiddleName,
      parentFirstName: parentFirstName,
      passport: passport,
      panCard: panCard,
      dateBirth: dateBirth,
      gender: gender,
      homePhone: homePhone,
      middleName: middleName,
      aadhaarCard: aadhaarCard,
      allergies: allergies,
    };
    return this.candidateRepository.update({ userId: userId }, candDto);
  }

  async findCandidateDocReviewdDocCount(ReqID: string) {
    const CandidateAndDocCOunt = await getConnection()
      .createQueryBuilder()
      .select([
        "count(id) as candidate_count",
        "IFNULL(sum(case when statusCode in ('CC') then 1 else 0 end ),0) as pend_doc_count",
        "IFNULL(sum(case when statusCode in ('DU') then 1 else 0 end ),0) as pend_rev_doc_count",
      ])
      .from(Candidate, "c")
      .where("c.recruiterId = :reqid", { reqid: ReqID })

      .getRawOne();

    return CandidateAndDocCOunt;
  }

  async findByRecuiterId(recruiterId: string) {
    return this.candidateRepository.findOne(recruiterId);
  }
  async findByRecruiterName(recruiterName: string) {
    return this.candidateRepository.findOne(recruiterName);
  }

  findOne(id: number) {
    return this.candidateRepository
      .findOne(id)
      .then((data) => {
        if (!data) throw new NotFoundException();
        return data;
      })
      .catch((err) => console.log(err));
  }
  async findOneName(id: any) {
    const candidate = await this.candidateRepository.findOne({
      where: { userId: id },
    });
    return candidate;
  }

  async findCandidateByUserId(id: string) {
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();
    // now we can execute any queries on a query runner, for example:
    let data = await queryRunner.query(`
    SELECT
    c.firstName,
    c.lastName,
    c.recruiterId,
    u.email,
    u.mobile ,
    u.userId ,
    cl.clientName ,
    cl.id,
    j.jobCode as jobId,
    j.id
    FROM
    candidate c
    INNER JOIN user u ON c.userId = u.userId
    left outer join job j on c.jobId=j.id
    left outer join client cl on j.clientId=cl.id
     where u.userId like '${id}'`);

    queryRunner.release();
    return data;
  }

  async findCandByUserId(uid: string) {
    const CandidateAndDocCOunt = await getConnection()
      .createQueryBuilder()
      .select([
        "u.email as email",
        "u.mobile as mobile",
        "u.lastLogin as lastLogin",
        "c.firstName as firstName",
        "c.lastName as lastName",
        "c.middleName as middleName",
        "c.homePhone as homePhone",
        "c.gender as gender",
        "c.dateBirth as dateBirth",
        "c.panCard as panCard",
        "c.passport as passport",
        "c.aadhaarCard as aadhaarCard",
        "c.parentFirstName as parentFirstName",
        "c.parentMiddleName as parentMiddleName",
        "c.parentLastName as parentLastName",
        "c.emergencyContactName as emergencyContactName",
        "c.emergencyEmail as emergencyEmail",
        "c.emergencyPhone as emergencyPhone",
        "c.bloodGroup as bloodGroup",
        "c.allergies as allergies",
        "c.statusCode as statusCode",
      ])
      .from(UserEntity, "u")
      .innerJoin(Candidate, "c", "u.userId = c.userId")
      // .innerJoin(Address, "a", "a.userId = u.userId")
      .where("u.userId = :uid", { uid: uid })
      .getRawOne();
    return CandidateAndDocCOunt;
  }

  remove(id: any, activeState: any) {
    return this.candidateRepository.update(
      { userId: id },
      { isActive: activeState }
    );
  }

  async findAll(page: number, size: number) {
    const res = await this.candidateRepository.findAndCount({
      take: size,
      skip: (page - 1) * size,
    });
    return {
      totalNumber: res[1],
      data: res[0],
      currentPage: page,
      totalPages: Math.ceil(res[1] / size),
    };
  }

  async findByQueryAndSort(
    query: string = "",
    field: string = "firstName",
    order: string = "DESC",
    statusCode: string = "",
    rid: string = ""
  ) {
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // now we can execute any queries on a query runner, for example:

    let data: any;
    data = await queryRunner.query(`
    SELECT
    c.id ,
    c.firstName,
    c.lastName,
    c.statusCode,
    concat(c.firstName," ",
    c.lastName
     ) as name,
    u.email,
    u.mobile ,
    u.userId ,
    u.isActive,
    concat(e.firstName," ",
    e.lastName
     ) as recruitername,
    s.status,
    cl.clientName ,
    j.id as jobId
    FROM
    candidate c
    INNER JOIN user u ON c.userId = u.userId
    left outer join job j on c.jobId=j.id
    left outer join client cl on j.clientId=cl.id
    left outer Join employee e on c.recruiterId=e.userId
    left outer join status s on c.statusCode=s.statusCode
    where (c.firstName like '%${query}%' or c.lastName like '%${query}%' or mobile like '%${query}%' or email like '%${query}%' or clientName like '%${query}%') and
    case when '${statusCode}' <> '' then  find_in_set (c.statusCode ,"${statusCode}") else c.statusCode like  '%' end
    and find_in_set (c.recruiterId ,"${rid}")
    order By ${field} ${order}
 `);
    queryRunner.release();
    return data;
  }

  async getCandidateDetailsByUserId(userId: string) {
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // now we can execute any queries on a query runner, for example:
    let data = await queryRunner.query(`
    SELECT
        u.lastLogin,
        c.firstName AS firstName,
        c.lastName AS lastName,
        CONCAT(firstName,' ',lastName) AS fullName,
        u.profilePicture,
        u.userId AS userId,
        r.role AS userRole,
        u.email AS email,
        u.mobile AS mobile,
        u.firstTimeLogin AS firstTimeLogin
    FROM candidate c
    INNER JOIN user u ON c.userId = u.userId
    INNER JOIN userrole ur ON u.userId = ur.userId
    INNER JOIN role r ON ur.roleid = r.id

    WHERE u.userId like '${userId}'`);

    queryRunner.release();

    return data;
  }

  async candidateInfo(uid: string) {
    const candidateDetails = await getConnection()
      .createQueryBuilder()
      .select([
        "u.email as email",
        "u.mobile as mobile",
        "u.lastLogin as lastLogin",
        "c.firstName as firstname",
        "c.lastName as lastName",
        "c.middleName as middleName",
        "c.homePhone as homePhone",
        "c.gender as gender",
        "c.dateBirth as dateBirth",
        "c.panCard as panCard",
        "c.passport as passport",
        "c.aadhaarCard as aadhaarCard",
        "c.parentFirstName as parentFirstName",
        "c.parentMiddleName as parentMiddleName",
        "c.parentLastName as parentLastName",
        "c.emergencyContactName as emergencyContactName",
        "c.emergencyEmail as emergencyEmail",
        "c.emergencyPhone as emergencyPhone",
        "a.id as id",
        "a.addressType as addressType",
        "a.address as address",
        "a.address2 as address2",
        "a.address3 as address3",
        "a.city as city",
        "a.state as state",
        "a.zip as zip",
      ])
      .from(UserEntity, "u")
      .innerJoin(Candidate, "c", "u.userId = c.userId")
      .innerJoin(Address, "a", "a.userId = u.userId")
      .where("u.userId = :uid", { uid: uid })
      .getRawOne();
    return candidateDetails;
  }

  async findCandidateAllCount(recruId) {
    const CandidateAndDocCOunt = await getConnection()
      .createQueryBuilder()
      .select([
        "count(id) as candidate_count",
        "IFNULL(sum(case when statusCode in ('CC') then 1 else 0 end ),0) as pend_doc_count",
        "IFNULL(sum(case when statusCode in ('DU') then 1 else 0 end ),0) as doc_upload_count",
        "IFNULL(sum(case when statusCode in ('RRD') then 1 else 0 end ),0) as recru_rev_done_count",
        "IFNULL(sum(case when statusCode in ('ORA') then 1 else 0 end ),0) as offer_req_appr_count",
        "IFNULL(sum(case when statusCode in ('ORR') then 1 else 0 end ),0) as offer_req_rej_count",
        "IFNULL(sum(case when statusCode in ('CRO') then 1 else 0 end ),0) as can_rej_offer_count",
        "IFNULL(sum(case when statusCode in ('CAO') then 1 else 0 end ),0) as can_accpt_offer_count",
        "IFNULL(sum(case when statusCode in ('HRD') then 1 else 0 end ),0) as hr_rev_done_count",
        "IFNULL(sum(case when statusCode in ('OR') then 1 else 0 end ),0) as offer_rele_count",
        "IFNULL(sum(case when statusCode in ('ORI') then 1 else 0 end ),0) as offer_rele_init_count",
      ])
      .from(Candidate, "c")
      .where("find_in_set (c.recruiterId ,:reqid)", {
        reqid: recruId,
      })
      .getRawOne();

    return CandidateAndDocCOunt;
  }

  async updateStatusCode(
    userId: any,
    statusCode: any,
    description: any,
    emailTo: any,
    emailFrom: any,
    subject: any
  ) {
    const notification = this.notifyRepository.create({
      fromEmail: emailFrom,
      toEmail: emailTo,
      subject: description,
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: userId,
      updatedBy: userId,
    });

    const workflowRepo = this.workflowRepo.create({
      description: description,
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: userId,
      updatedBy: userId,
    });

    await this.candidateRepository.update(
      { userId: userId },
      { status: statusCode }
    );
    await this.notifyRepository.save(notification);
    await this.workflowRepo.save(workflowRepo);
  }

  async findCandidateAndRecuiter(id: string) {
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();
    // now we can execute any queries on a query runner, for example:
    let data = await queryRunner.query(`
        SELECT
        c.firstName,
        c.lastName,
        u.email,
        u.mobile ,
        d.status as recruiterStatus,
        d.remarks as recruiterRemarks,
        e.firstName as recuriterFirstName,
        e.lastName as recuriterLastName,
        ru.email as recuriterEmail,
        ru.mobile as recuriterMobile
        FROM
        candidate c
        INNER JOIN user u ON c.userId = u.userId
        LEFT OUTER JOIN employee e on c.recruiterId=e.userId
        LEFT OUTER JOIN document d on c.userId=d.userId
        LEFT OUTER JOIN user ru on c.recruiterId=ru.userId
        where u.userId like '${id}'`);

    queryRunner.release();
    console.log(data);
    return data;
  }

  async getNotifiByCuserId(userId: string) {
    const getNotifiByCuserId = await getConnection()
      .createQueryBuilder()
      .select([
        "c.firstName as firstName",
        "c.lastName as lastName",
        "concat(c.firstName , c.lastName) as fullName",
        "n.subject as subject",
        "n.updatedAt as updatedAt",
        "n.userId as userId",
      ])
      .from(Candidate, "c")
      .innerJoin(UserEntity, "u", "c.userId = u.userId")
      .leftJoin(Notification, "n", "c.userId = n.userId")
      .where("c.userId=:userId", { userId: userId })
      .getRawMany();
    console.log("nn___________", getNotifiByCuserId);
    return getNotifiByCuserId;
  }
  //     queryRunner.release();
  //     console.log(data);
  //     return data;
  // }

  updateRecruiter(suid: any, auid: any) {
    return this.candidateRepository.update(
      { user: suid },
      {
        user: auid,
      }
    );
  }

  async sendEmailAndChangeStatus(
    userId: any,
    statusCode: any,
    subject: any,
    description: any,
    emailTo: any,
    emailFrom: any,
    cc: any,
    emailDataToSent: any = {}
  ) {
    const mail = this.mailService.sendEmail1(
      emailTo,
      "Offer",
      subject,
      cc,
      emailDataToSent
    );
    const statuss = await this.updateStatusCode(
      userId,
      statusCode,
      description,
      emailTo,
      emailFrom,
      subject
    );
  }

  async getEmailByCandidateuserId(userId: string) {
    const getNameByCuserId = await getConnection()
      .createQueryBuilder()
      .select([
        "u.email as email,c.recruiterId as recruiterId,u.mobile,c.firstName,c.lastName",
      ])
      .from(Candidate, "c")
      .innerJoin(UserEntity, "u", "c.userId = u.userId")
      .where("c.userId=:userId", { userId: userId })
      .getRawOne();
    console.log("ee___________", getNameByCuserId);
    return getNameByCuserId;
  }

  async getEmailByManagerUserId(userId: string) {
    const getNameByCuserId = await getConnection()
      .createQueryBuilder()
      .select(["u.email as remail,e.managerId as rmanagerId"])
      .from(Employee, "e")
      .innerJoin(UserEntity, "u", "e.userId = u.userId")
      .where("e.userId=:userId", { userId: userId })
      .getRawOne();
    console.log("ee___________", getNameByCuserId);
    return getNameByCuserId;
  }
  async getEmailByuserId(userId: string) {
    let candidateEmail = "";
    let recruiterEmail = "";
    let hrEmail = "";
    let amEmail = "";
    let leaderEmail = "";
    let data1 = await this.getEmailByCandidateuserId(userId);
    let data2 = await this.getEmailByManagerUserId(data1.recruiterId);
    let data3 = await this.getEmailByManagerUserId(data2.rmanagerId);
    let data4 = await this.getEmailByManagerUserId(data3.rmanagerId);
    let data5 = await this.getEmailByManagerUserId(data4.rmanagerId);

    candidateEmail = data1;
    recruiterEmail = data2.remail;
    hrEmail = data3.remail;
    amEmail = data4.remail;
    leaderEmail = data5.remail;
    return {
      candidateEmail,
      recruiterEmail,
      hrEmail,
      amEmail,
      leaderEmail,
    };
  }

  async sendEmailOfferLetterToCandiate(userId, mailData) {
    const { sendTo, temp, data, subject, fileName } = mailData;
    const mailSent = this.mailService.sendEmailOfferToCandidate(
      sendTo,
      temp,
      data,
      subject,
      fileName,
      userId
    );
    return mailSent;
  }

  async sendEmailOffer(
    userId: any,
    statusCode: any,
    subject: any,
    description: any,
    emailFrom: any,
    sendTo: string,
    mailData: any,
    userId1: any
  ) {
    const statusCode1 = "OR";
    const mail = this.mailService.sendEmailOffer(
      sendTo,
      "OfferReleaseToCand",
      subject,
      mailData,
      userId1
    );
    const statuss = await this.updateStatusCode(
      userId,
      statusCode,
      description,
      sendTo,
      emailFrom,
      subject
    );
  }
  async updateCandStatusByUserID(userId: any, statusCode: any) {
    const updateCandidateStatus = this.candidateRepository.update(
      { userId: userId },
      {
        status: statusCode,
      }
    );
    return updateCandidateStatus;
  }

  async getRectruitersByUserId(uid: string) {
    // const getRecruiters = await getConnection().createQueryBuilder().select();

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();
    // now we can execute any queries on a query runner, for example:
    let data = await queryRunner.query(`
    with recursive cte (userId, firstName, lastName, managerId) as (
    select userId,
    firstName,lastName,
    managerId
    from employee
    where userId = '${uid}'
    union all
    select p.userId,
    p.firstName, p.lastName,
    p.managerId
    from employee p
    inner join cte
    on p.managerId = cte.userId
    )
    select cte.*, r.role from cte inner join userrole ur on cte.userId = ur.userId
    inner join role r on ur.roleId = r.id
    where r.role = 'Recruiter';`);

    queryRunner.release();
    return data;
  }

  async updateStatusCodeAndLeader(
    userId: any,
    leaderId: any,
    statusCode: any,
    description: any,
    emailTo: any,
    emailFrom: any,
    subject: any
  ) {
    const workflowRepo = this.workflowRepo.create({
      description: description,
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: leaderId,
      updatedBy: leaderId,
    });

    await this.candidateRepository.update(
      { userId: userId },
      { status: statusCode }
    );
    await this.workflowRepo.save(workflowRepo);
  }

  async getStatusByCandidateuserId(userId: string) {
    const getStatusByCuserId = await getConnection()
      .createQueryBuilder()
      .select(["c.statusCode"])
      .from(Candidate, "c")
      .innerJoin(UserEntity, "u", "c.userId = u.userId")
      .where("c.userId=:userId", { userId: userId })
      .getRawOne();
    return getStatusByCuserId;
  }

  async updateCandidateToNewRec(oldrec: any, newrec: any) {
    const updaterec = await this.candidateRepository.update(
      { user: oldrec },
      { user: newrec }
    );
    return updaterec;
  }

  async getCandidateCountForRecuiter(recruiterId: string) {
    let candidateCount = await getRepository(Candidate)
      .createQueryBuilder("candidate")
      .select("COUNT(candidate.id)", "candCount")
      .where("candidate.recruiterId=:recId", { recId: recruiterId })
      .getRawOne();
    return candidateCount;
  }
}
