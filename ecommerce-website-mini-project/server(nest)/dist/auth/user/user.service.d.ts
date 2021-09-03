import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<UserEntity>);
    findByEmail(email: string): Promise<UserEntity>;
    findById(id: string): Promise<UserEntity>;
    create(userDto: CreateUserDto): Promise<UserEntity>;
}
