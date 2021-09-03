import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../auth/user/user.service";
import { getConnection, Repository } from "typeorm";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Address } from "./entities/address.entity";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private userService: UserService
  ) {}
  async create(uid: any, createAddressDto: CreateAddressDto) {
    try {
      const {
        addressType,
        address,
        address2,
        address3,
        city,
        state,
        zip,
        userId,
      } = createAddressDto;
      return this.addressRepository.save({
        addressType,
        address,
        address2,
        address3,
        city,
        state,
        zip,
        userId: userId,
      });
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }

  findAll() {
    return this.addressRepository.find();
  }

  async findOne(id: number) {
    return this.addressRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException();
      return data;
    });
  }

  async findByUserId(uid: any) {
    const addressData = await getConnection()
      .createQueryBuilder()
      .select([
        "a.id as id",
        "a.addressType as addressType",
        "a.address as address",
        "a.address2 as address2",
        "a.address3 as address3",
        "a.city as city",
        "a.state as state",
        "a.zip as zip",
      ])
      .from(Address, "a")
      .where("a.userId = :uid", { uid: uid })
      .getRawMany();
    return addressData;
  }

  update(uid: number, updateAddressDto: UpdateAddressDto) {
    return this.addressRepository.update(
      { id:uid },
      {
        ...updateAddressDto,
      }
    );
  }

  remove(id: number) {
    return this.addressRepository.delete({ id });
  }

  async updateAddressSer(uid: number, updateAddressDto: any) {
    const {
      addressType,
      address,
      address2,
      address3,
      city,
      state,
      zip,
      userId,
    } = updateAddressDto;

    try {
      if (uid === 0 || uid === null) {
        const addressDto = {
          userId: userId,
          addressType: addressType,
          address: address,
          address2: address2,
          address3: address3,
          city: city,
          state: state,
          zip: zip,
        };
        return this.addressRepository.save(addressDto);
      } else {
        return this.update(uid, updateAddressDto);
      }
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }
}
