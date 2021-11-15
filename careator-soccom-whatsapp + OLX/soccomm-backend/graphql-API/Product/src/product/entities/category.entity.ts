import { PrimaryGeneratedColumn } from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

import { Product } from './product.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Product])
  product?: Product[];
}
