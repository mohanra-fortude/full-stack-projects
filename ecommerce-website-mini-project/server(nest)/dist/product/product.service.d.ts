import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<{
        productName: string;
        productImage: string;
    } & Product>;
    findAll(page: number, size: number): Promise<{
        totalItems: number;
        data: Product[];
        currentPage: number;
        totalPages: number;
    }>;
    sort(field: string, order: string, page: number, size: number): Promise<{
        totalItems: number;
        data: Product[];
        currentPage: number;
        totalPages: number;
    }>;
    filterByPrice(min: number, max: number, page: number, size: number): Promise<{
        totalItems: number;
        data: Product[];
        currentPage: number;
        totalPages: number;
    }>;
    fingByQuery(prodname: string, page: number, size: number): Promise<{
        totalItems: number;
        data: Product[];
        currentPage: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    bulkCreate(): Promise<import("typeorm").InsertResult>;
    private createDump;
}
