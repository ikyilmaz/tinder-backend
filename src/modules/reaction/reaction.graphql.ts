import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { REACTION_TYPE } from './reaction.enum';

@ObjectType({
  description: 'Reaksiyon dönüt tipi...',
})
export class ReactionReturnType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  toUserId: string;

  @Field(() => ID)
  fromUserId: string;

  @Field(() => String)
  type: REACTION_TYPE;
}

@InputType({
  description: 'Reaksiyon tipi...',
})
export class ReactionInputType {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  toUserId: string;
}
