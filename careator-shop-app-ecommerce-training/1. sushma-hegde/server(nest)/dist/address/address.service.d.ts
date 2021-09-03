import { UserService } from 'src/auth/user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
export declare class AddressService {
    private addressRepository;
    private userService;
    constructor(addressRepository: Repository<Address>, userService: UserService);
    create(uid: string, createAddressDto: CreateAddressDto): Promise<{
        city: string;
        line1: string;
        line2: string;
        pincode: number;
        state: string;
        user: import("../auth/entities/user.entity").UserEntity;
        createdAt: string;
    } & Address>;
    findAll(): Promise<Address[]>;
    findOne(id: number): Promise<Address>;
    update(id: number, updateAddressDto: UpdateAddressDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
