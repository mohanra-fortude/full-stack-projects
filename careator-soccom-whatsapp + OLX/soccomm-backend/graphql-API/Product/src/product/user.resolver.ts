import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { ProductService } from './product.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private productService: ProductService) {}

  @ResolveField((of) => [Product])
  public product(@Parent() user: User): any {
    console.log(user,"user")
    return this.productService.findUser(user.id);
  }
}
