"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const unique_names_generator_1 = require("unique-names-generator");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    create(createProductDto) {
        return this.productRepository.save({
            productName: createProductDto.name,
            productImage: createProductDto.image,
        });
    }
    findAll(page, size) {
        return this.productRepository
            .findAndCount({
            take: size,
            skip: (page - 1) * size,
        })
            .then((res) => ({
            totalItems: res[1],
            data: res[0],
            currentPage: page,
            totalPages: Math.ceil(res[1] / size),
        }));
    }
    sort(field, order, page, size) {
        if (field === "price" && order === "ascending")
            return this.productRepository
                .findAndCount({
                order: {
                    productSalePrice: "ASC",
                },
                take: size,
                skip: (page - 1) * size,
            })
                .then((res) => ({
                totalItems: res[1],
                data: res[0],
                currentPage: page,
                totalPages: Math.ceil(res[1] / size),
            }));
        else if (field === "price" && order === "descending")
            return this.productRepository
                .findAndCount({
                order: {
                    productSalePrice: "DESC",
                },
                take: size,
                skip: (page - 1) * size,
            })
                .then((res) => ({
                totalItems: res[1],
                data: res[0],
                currentPage: page,
                totalPages: Math.ceil(res[1] / size),
            }));
        else if (field === "name" && order === "ascending")
            return this.productRepository
                .findAndCount({
                order: {
                    productName: "ASC",
                },
                take: size,
                skip: (page - 1) * size,
            })
                .then((res) => ({
                totalItems: res[1],
                data: res[0],
                currentPage: page,
                totalPages: Math.ceil(res[1] / size),
            }));
    }
    filterByPrice(min, max, page, size) {
        return this.productRepository
            .findAndCount({
            where: { productPrice: typeorm_2.Between(min, max) },
            take: size,
            skip: (page - 1) * size,
        })
            .then((res) => ({
            totalItems: res[1],
            data: res[0],
            currentPage: page,
            totalPages: Math.ceil(res[1] / size),
        }));
    }
    fingByQuery(prodname, page, size) {
        return this.productRepository
            .findAndCount({
            where: { productName: typeorm_2.Like(`%${prodname}%`) },
            order: { productId: "ASC" },
            take: size,
            skip: (page - 1) * size,
        })
            .then((res) => ({
            totalItems: res[1],
            data: res[0],
            currentPage: page,
            totalPages: Math.ceil(res[1] / size),
        }));
    }
    findOne(id) {
        return this.productRepository.findOne(id).then((data) => {
            if (!data)
                throw new common_1.NotFoundException();
            return data;
        });
    }
    update(id, updateProductDto) {
        return this.productRepository.update({ productId: id }, {
            productName: updateProductDto.name,
            productImage: updateProductDto.image,
        });
    }
    remove(id) {
        return this.productRepository.delete({ productId: id });
    }
    bulkCreate() {
        return this.productRepository.insert(this.createDump());
    }
    createDump(arrayLength = 100) {
        let a = new Array(arrayLength);
        debugger;
        for (let i = 0; i < a.length; i++) {
            const minPrice = 1000;
            const maxPrice = 50000;
            const randomStock = Math.floor(Math.random() * 100);
            const randomPrice = Math.random() * (+maxPrice - +minPrice) + +minPrice;
            const salePrice = !!Math.floor((Math.random() * 1000) % 2)
                ? randomPrice * (Math.floor(Math.random() * (50 - 10) + 10) / 100)
                : randomPrice;
            a[i] = {
                productName: unique_names_generator_1.uniqueNamesGenerator({
                    dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.colors, unique_names_generator_1.names],
                    separator: " ",
                }),
                productImage: `https://picsum.photos/400?image=${Math.floor(Math.random() * 1000)}`,
                productStock: randomStock,
                productPrice: randomPrice.toFixed(2),
                productSalePrice: salePrice.toFixed(2),
            };
        }
        return a;
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map