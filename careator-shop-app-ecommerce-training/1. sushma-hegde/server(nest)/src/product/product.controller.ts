import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiTags, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@ApiTags("Product")
@Controller("product")
// @UseGuards(JwtAuthGuard) : apply the guard to all the routes
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post("bulk")
  createBulk() {
    return this.productService.bulkCreate();
  }

  @Get()
  findAll(@Query("page") page: number = 1, @Query("size") size: number = 20) {
    return this.productService.findAll(page, size);
  }

  //GET: /product/search?prodname="nuclear"&page=1&size=20
  @Get("search")
  findByQuery(
    @Query("prodname") prodname: string,
    @Query("page") page: number,
    @Query("size") size: number
  ) {
    return this.productService.fingByQuery(prodname, page, size);
  }

  //query parameter
  //GET : /product?field=price&order=ascending&page=1&size=20
  //GET: /product?field=name&order=ascending&page=1&size=20 -- for sort by name
  @Get("sort")
  sortByField(
    @Query("field") field: string,
    @Query("order") order: string,
    @Query("page") page: number,
    @Query("size") size: number
  ) {
    console.log(field, order);
    return this.productService.sort(field, order, page, size);
  }

  //GET: /?min=1000&max=5000
  @Get("filter")
  filterByPrice(
    @Query("min") min: number,
    @Query("max") max: number,
    @Query("page") page: number,
    @Query("size") size: number
  ) {
    console.log(min, max);
    return this.productService.filterByPrice(min, max, page, size);
  }

  @ApiNotFoundResponse({ description: "No data is found for the specified ID" })
  @ApiOkResponse({ description: "Product Data found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
