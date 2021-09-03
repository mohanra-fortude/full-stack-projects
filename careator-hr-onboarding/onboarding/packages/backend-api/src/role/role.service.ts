import { getConnection, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) {}
    create(createRoleDto: CreateRoleDto) {
        return "This action adds a new role";
    }

    findAll() {
        return this.roleRepository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} role`;
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`;
    }

    remove(id: number) {
        return `This action removes a #${id} role`;
    }

    async findAllTest() {
        const user = await getConnection()
            .createQueryBuilder()
            .select("role")
            .from(Role, "role")
            // .where("user.id = :id", { id: 1 })
            .getMany();

        return "hello";
        // return this.roleRepository.find();
    }

    async findAllForCreateUser() {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        // establish real database connection using our new query runner
        await queryRunner.connect();
        let managerData = await queryRunner.query(`
        SELECT * FROM role WHERE id != 1 and id != 6`);

        queryRunner.release();

        return managerData;
    }
}
