import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../role/entities/role.entity";
import { getConnection, LessThan, Repository } from "typeorm";
import { CreateUserroleDto } from "./dto/create-userrole.dto";
import { UpdateUserroleDto } from "./dto/update-userrole.dto";
import { UserRole } from "./entities/userrole.entity";

@Injectable()
export class UserroleService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(UserRole) private userroleRepo: Repository<UserRole>
  ) {}

  create(createUserroleDto: CreateUserroleDto) {
    return "This action adds a new userrole";
  }

  async findUserRole() {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    let data = await queryRunner.query(`
    SELECT
    r.role AS role,
    r.description AS description,
    count(ur.userId) as userCount,
    ur.roleId AS roleId,
    u.isActive AS isActive


    FROM
    role r
    LEFT JOIN userrole ur on r.id = ur.roleId
    LEFT JOIN user u on ur.userId = u.userId
    where r.role not in ('Admin', 'candidate') and u.isActive=1
    group by r.role, r.description, ur.roleId
     `);
    queryRunner.release();

    return data;
  }

  findAllManager = async (role: any) => {
    const roleData = await this.roleRepo.find({
      where: { id: role },
    });

    const userroleData = await this.userroleRepo.find({
      where: { roleId: LessThan(roleData[0].id) },
      relations: ["userId"],
    });

    return userroleData;
  };

  findOne(id: number) {
    return `This action returns a #${id} userrole`;
  }

  update(id: number, updateUserroleDto: UpdateUserroleDto) {
    return `This action updates a #${id} userrole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userrole`;
  }

  findOneRole(id: number) {
    return this.roleRepo.findOne({ where: { id: id } });
  }
}
