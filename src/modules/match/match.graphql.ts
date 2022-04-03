import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { PublicUserType } from '../user/user.graphql';

@ObjectType({
  description: 'Eşleşme dönüt tipi...',
})
export class MatchReturnType {
  @Field(() => ID)
  matchId: string;

  @Field(() => PublicUserType, { nullable: false })
  user: PublicUserType;
}
