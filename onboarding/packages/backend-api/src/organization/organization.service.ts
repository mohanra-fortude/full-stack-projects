import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { Repository } from "typeorm";
import { Organization } from "./entities/organization.entity";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const { orgName } = createOrganizationDto;
    return await this.orgRepository.save({
      orgName: orgName,
    });
  }

  findAll() {
    return this.orgRepository.find();
  }

  findOne(id: number) {
    return this.orgRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException();
      return data;
    });
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return this.orgRepository.update(
      { id },
      {
        ...updateOrganizationDto,
      }
    );
  }

  remove(id: number) {
    return this.orgRepository.delete({ id });
  }
}
