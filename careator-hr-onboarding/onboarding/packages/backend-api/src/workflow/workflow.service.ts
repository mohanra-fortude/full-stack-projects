import { NotFoundException } from "@nestjs/common";
import { CandidateService } from "./../candidate/candidate.service";
import { UserService } from "../auth/user/user.service";
import { RoleService } from "../role/role.service";
import { UserroleService } from "../userrole/userrole.service";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateWorkflowDto } from "./dto/create-workflow.dto";
import { UpdateWorkflowDto } from "./dto/update-workflow.dto";
import { Workflow } from "./entities/workflow.entity";
import { getConnection, Repository } from "typeorm";
import { getRepository } from "typeorm";
import { Candidate } from "../candidate/entities/candidate.entity";
import { AddressService } from "../address/address.service";
import { Notification } from "../notification/entities/notification.entity";
import { Address } from "../address/entities/address.entity";
import { MailService } from "../auth/mail/mail.service";

import { mailSubject } from "src/mailsubject-constants";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private workflowRepository: Repository<Workflow>,
    @InjectRepository(Candidate)
    private candidateService: Repository<Candidate>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private addressService: AddressService,
    private mailService: MailService,
    private notificationService: NotificationService,
    @InjectRepository(Notification)
    private notifyRepository: Repository<Notification>
  ) {}

  async create(createWorkflowDto: CreateWorkflowDto) {
    return this.workflowRepository.save({});
  }

  async findAll(page: number, size: number) {
    const res = await this.workflowRepository.findAndCount({
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

  findOne(id: number) {
    return this.workflowRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException();
      return data;
    });
  }

  update(id: number, updateWorkflowDto: UpdateWorkflowDto) {
    return `This action updates a #${id} workflow`;
  }

  remove(id: number) {
    return `This action removes a #${id} workflow`;
  }
  async findByQueryAndSort(
    query: string = "",
    field: string = "firstName",
    order: string = "DESC",
    statusCode: string = ""
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
order By ${field} ${order}
`);
    queryRunner.release();
    return data;
  }
  async getWorkflowDetailsByUserId(uid: string) {
    const workflowDetails = await getConnection()
      .createQueryBuilder()
      .select([
        // "w.id as id",
        "w.description as description",
        "concat(date_format(w.createdAt,'%d/%m/%Y'),' ',time_format(w.createdAt, '%h:%i:%s')) AS createtime",
      ])
      .from(Workflow, "w")
      .where("w.userId = :uid", { uid: uid })
      .getRawMany();
    return workflowDetails;
  }

  async createRow(workflowRow: Workflow) {
    return this.workflowRepository.save(workflowRow);
  }

  async sendMailAndCaptureInNotificationAndWorkflowTables(
    dataAboutMailWorkflowAndNotification: any
  ) {
    const { emailData, workflowData, notificationData, roleName } =
      dataAboutMailWorkflowAndNotification;
    const { sendTo, temp, subject, cc, data } = emailData;
    if (roleName === "HR") {
      return this.mailService
        .sendEmail1(sendTo, temp, subject, cc, data)
        .then((emailRowData) => {
          return this.createRow(workflowData).then((workflowRowData) => {
            return this.notificationService.createRow(notificationData);
          });
        })
        .catch((err) => console.log(err));
    } else if (roleName === "Recruiter") {
      return this.mailService
        .sendEmail(sendTo, temp, data, subject)
        .then((emailRowData) => {
          return this.createRow(workflowData).then((workflowRowData) => {
            return this.notificationService.createRow(notificationData);
          });
        })
        .catch((err) => console.log(err));
    }
  }
}
