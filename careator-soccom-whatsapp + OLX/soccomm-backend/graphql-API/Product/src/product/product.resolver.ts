import { UseGuards } from '@nestjs/common';
import {
    Args, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Category } from './entities/category.entity';
import { Group } from './entities/group.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { ProductService } from './product.service';
@UseGuards(GqlAuthGuard)
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @CurrentUser() user,
  ) {
    let { amount, categoryId, groupId, description, name, quantity, userId } =
      createProductInput;
    userId = user.sub;
    return this.productService.create({
      amount,
      categoryId,
      groupId,
      description,
      name,
      quantity,
      userId,
    });
  }

  @Query(() => [Product], { name: 'allproduct' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id') id: string) {
    return this.productService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.productService.findOne(reference.id);
  }

  @ResolveField((of) => User)
  user(@Parent() product: Product) {
    return { __typename: 'User', id: product.userId };
  }
  @ResolveField((of) => Category)
  category(@Parent() product: Product) {
    return { __typename: 'Category', id: product.categoryId };
  }
  @ResolveField((of) => Group)
  group(@Parent() product: Product) {
    return { __typename: 'Group', id: product.groupId };
  }
}
