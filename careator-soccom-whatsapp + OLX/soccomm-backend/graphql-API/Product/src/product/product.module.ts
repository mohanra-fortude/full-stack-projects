import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from './category.resolver';
import { Product } from './entities/product.entity';
import { GroupResolver } from './group.resolver';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductResolver,
    ProductService,
    UserResolver,
    CategoryResolver,
    GroupResolver,
  ],
})
export class ProductModule {}
