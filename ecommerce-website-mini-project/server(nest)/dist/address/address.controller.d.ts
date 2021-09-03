import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(req: any, createAddressDto: CreateAddressDto): Promise<{
        city: string;
        line1: string;
        line2: string;
        pincode: number;
        state: string;
        user: import("../auth/entities/user.entity").UserEntity;
        createdAt: string;
    } & Address>;
    findAll(): Promise<Address[]>;
    findOne(id: string): Promise<Address>;
    update(id: string, updateAddressDto: UpdateAddressDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
