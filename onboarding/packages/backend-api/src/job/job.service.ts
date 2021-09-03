import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientService } from "src/client/client.service";
import { getConnection, Repository } from "typeorm";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { JobEntity } from "./entities/job.entity";

@Injectable()
export class JobService {
  logger: any;
  constructor(
    @InjectRepository(JobEntity)
    private jobRepository: Repository<JobEntity>
  ) {}

  async create(createJobDto: CreateJobDto) {
    const { Jcode } = createJobDto;
    return await this.jobRepository.save({
      jobCode: Jcode,
    });
  }

  async createJob(cdata, Jcode) {
    return await this.jobRepository.save({
      jobCode: Jcode,
      client: cdata.id,
      createdBy: cdata.createdBy,
      updatedBy: cdata.createdBy,
    });
  }

  async findAll() {
    const clientjobget = await this.jobRepository.find({
      relations: ["client"],
    });

    return clientjobget;
  }

  async findJobsByClientId(id: number) {
    const data = await this.jobRepository.find({
      where: { client: id, isActive: 1 },
      relations: ["client"],
    });
    return data;
  }

  async findJobsByClientIdAndJobName(id: number, jobcode: string) {
    try {
      const data = await this.jobRepository.findOne({
        where: { client: id, jobCode: jobcode },
        relations: ["client"],
      });
      if (!data) {
        return "No Job Found";
      }
      return Promise.resolve(data);
    } catch (e) {
      this.logger.error(e);
      return Promise.reject(e);
    }
  }

  async findJobsByJobName(jobcode: string) {
    try {
      const data = await this.jobRepository.findOne({
        where: { jobCode: jobcode },
        // relations: ["client"],
      });
      if (!data) {
        return "No Job Found";
      }
      return Promise.resolve(data);
    } catch (e) {
      this.logger.error(e);
      return Promise.reject(e);
    }
  }

  async findOne(id: number) {
    const datatest = await this.jobRepository.findOne({
      where: { id: id },
      relations: ["client"],
    });
    return datatest;
  }

  async update(data: any) {
    try {
      const updatejob = this.jobRepository.update(
        {
          id: data.jId,
        },
        {
          jobCode: data.Jcode,
        }
      );
      return updatejob;
    } catch (e) {
      return console.log(e);
    }
  }

  async updateActivation(id: number, data: any) {
    return await this.jobRepository.update(
      { id: id },
      {
        isActive: data.isActive,
      }
    );
  }

  remove(id: number) {
    return this.jobRepository.delete(id);
  }
}
