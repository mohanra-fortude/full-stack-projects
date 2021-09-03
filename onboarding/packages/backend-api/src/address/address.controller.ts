import { Post, Put, Request } from "@nestjs/common";
import { Controller, Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Address } from "./entities/address.entity";

@ApiTags("Address")
@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Request() req: any, @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(req, createAddressDto);
  }
  

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.addressService.findOne(+id);
  }

  @Get("addressByUserId/:uid")
  findByUserId(@Param("uid") uid: string) {
    return this.addressService.findByUserId(uid);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() CreateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, CreateAddressDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.addressService.remove(+id);
  }

  @Put("updateAddress/:addressId")
  updateAddress(
    @Param("addressId") addressId: number,
    @Body() updateAddressDto: UpdateAddressDto
  ) {
    return this.addressService.updateAddressSer(+addressId, updateAddressDto);
  }
}
