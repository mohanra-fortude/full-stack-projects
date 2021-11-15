import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { Group } from './group.entity';
import { User } from './user.entity';


@ObjectType()
@Entity()
@Directive('@key(fields:"id")')
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  amount: string;

  @Field()
  @Column()
  quantity: string;

  @Field()
  @Column()
  categoryId: string;

  @Field()
  @Column()
  groupId: string;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  user: User;

  @Field(() => Category)
  category: Category;

  @Field(() => Group)
  group: Group;
}
