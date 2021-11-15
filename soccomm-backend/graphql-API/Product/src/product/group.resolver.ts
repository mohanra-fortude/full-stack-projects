import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Group } from './entities/group.entity';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';


@Resolver((of) => Group)
export class GroupResolver {
  constructor(private productService: ProductService) {}

  @ResolveField((of) => [Product])
  public product(@Parent() group: Group): any {
    return this.productService.findGroup(group.id);
  }
}
