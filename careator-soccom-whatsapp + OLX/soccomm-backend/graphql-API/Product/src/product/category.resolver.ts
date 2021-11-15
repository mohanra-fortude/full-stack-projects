import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';


@Resolver((of) => Category)
export class CategoryResolver {
  constructor(private productService: ProductService) {}

  @ResolveField((of) => [Product])
  public product(@Parent() cateogry: Category): any {
    return this.productService.findCategory(cateogry.id);
  }
}
