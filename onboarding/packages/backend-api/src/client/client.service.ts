import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { CreateClientDto } from "./dto/create-client.dto";
import { Client } from "./entities/client.entity";
import { JobService } from "../job/job.service";
import { JobEntity } from "../job/entities/job.entity";

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,

    @InjectRepository(JobEntity)
    private jobRepository: Repository<JobEntity>,
    private jobservice: JobService
  ) {}

  async create(CreateClientDto: CreateClientDto) {
    try {
      let { Name, Jcode, createdBy } = CreateClientDto;

      const clientavailable = await this.findByClientName(Name);
      if (clientavailable) {
        const cdata = await this.clientRepository.findOne({
          where: { clientName: Name },
        });
        const jdata = await this.jobservice.createJob(cdata, Jcode);
      } else {
        const datas = await this.clientRepository.save({
          clientName: Name,
          createdBy: createdBy,
          updatedBy: createdBy,
        });
        const cdata = await this.clientRepository.findOne({
          where: { clientName: Name },
        });
        const jdata = await this.jobservice.createJob(cdata, Jcode);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async findByName(clientname: string) {
    try {
      const data = await this.clientRepository.findOne({
        where: { clientName: clientname },
      });
      if (data == null) {
        return "No Client Name Found";
      }
      return Promise.resolve(data);
    } catch (e) {
      this.logger.error(e);
      return Promise.reject(e);
    }
  }
  async findAllClients() {
    // const res = await this.clientRepository.find();
    // return { res };
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    let res;
    res = await queryRunner.query(
      `SELECT
      distinct cl.id,
      cl.clientName
      FROM client cl
      INNER JOIN job j ON cl.id = j.clientId
      where j.isActive = 1`
    );
    queryRunner.release();
    return {res};
  }

  async findByClientName(clientName: string) {
    return this.clientRepository.findOne({
      where: { clientName: clientName },
    });
  }

  async findAll(page: number, size: number) {
    const res = await this.clientRepository.findAndCount({
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
    field: string = "clientName",
    order: string = "DESC",
    userId: string
  ) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    let data;
    data = await queryRunner.query(
      `SELECT
    cl.id AS clientId,
    cl.clientName AS clientName,
    j.id as jobId,
    j.isActive,
    j.jobCode AS jobCode
    FROM client cl
    left outer JOIN job j ON cl.id = j.clientId
    where (cl.clientName LIKE "%${query}%" or j.jobCode LIKE "%${query}%")
    Order by ${field} ${order}
    `
    );
    queryRunner.release();

    return data;
  }

  async findById(id: number) {
    return await this.clientRepository.findOne(id);
  }

  async update(data: any) {
    try {
      const updateclient = await this.clientRepository.update(
        { id: data.cId },
        {
          clientName: data.Name,
        }
      );
      const updatejob = await this.jobservice.update(data);
      if (!updateclient || !updatejob) {
        return "cannot update";
      }
      return Promise.resolve(updateclient), Promise.resolve(updatejob);
    } catch (e) {
      console.log(e);
    }
  }

  remove(id: number) {
    return this.clientRepository.delete(id);
  }
}
