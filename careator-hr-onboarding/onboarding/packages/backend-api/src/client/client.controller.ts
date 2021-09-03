import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@ApiTags("Client")
@Controller("client")
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  create(@Body() CreateClientDto: CreateClientDto) {
    return this.clientService.create(CreateClientDto);
  }

  @Get("getAllClients")
  findAllClients() {
    return this.clientService.findAllClients();
  }

  @Get("pagination")
  findAll(@Query("page") page: number = 1, @Query("size") size: number = 2) {
    return this.clientService.findAll(page, size);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.clientService.findById(+id);
  }
  @Get()
  findByQueryAndSort(
    @Query("q") query: string = "",
    @Query("f") field: string,
    @Query("o") order: string,
    @Query("userId") userId: string
  ) {
    return this.clientService.findByQueryAndSort(query, field, order, userId);
  }

  @Get("clientName")
  findByClientName(@Param("clientname") clientname: string) {
    return this.clientService.findByClientName(clientname);
  }

  //logger
  @Get("Name/:clientName")
  findByName(@Param("clientName") clientName: string) {
    return this.clientService.findByName(clientName);
  }
  @Get("client/fetch")
  findClientJob() {}

  @Patch()
  update(@Body() data: any) {
    return this.clientService.update(data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clientService.remove(+id);
  }
}
