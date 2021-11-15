import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  categoryId: string;
  @Field()
  groupId: string;

  @Field()
  description: string;

  @Field()
  amount: string;

  @Field()
  quantity: string;

  @Field({ nullable: true })
  userId?: string;
}
