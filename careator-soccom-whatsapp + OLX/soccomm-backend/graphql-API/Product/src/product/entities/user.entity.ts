import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './product.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @Directive('@external')
  id: string;

  @Field((type) => [Product])
  product?: Product[];
}
