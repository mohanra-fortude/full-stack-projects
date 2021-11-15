import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  async create(createProductInput: CreateProductInput) {
    const product = await this.productRepo.create(createProductInput);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: string) {
    return this.productRepo.findOne(id);
  }

  async update(id: string, updateProductInput: UpdateProductInput) {
    const update = await this.productRepo.create(updateProductInput);
    return this.productRepo.update(id, update);
  }

  remove(id: string) {
    return this.productRepo.delete(id);
  }

  findUser(userId: string) {
    return this.productRepo.find({ where: { userId } });
  }
  findCategory(categoryId: string) {
    return this.productRepo.find({ where: { categoryId } });
  }
  findGroup(groupId: string) {
    return this.productRepo.find({ where: { groupId } });
  }
}
