import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsMongoId, IsString } from 'class-validator';

@ObjectType()
export class MessageReturnType {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field()
  senderUserId: string;

  @Field()
  matchId: string;
}

@InputType()
export class AddMessageInputType {
  @Field({ nullable: false })
  @IsString()
  content: string;

  @Field({ nullable: false })
  @IsMongoId()
  matchId: string;
}
