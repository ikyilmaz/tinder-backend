import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsAlpha, IsOptional, Length } from 'class-validator';

@ObjectType()
export class PublicUserType {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: false })
  username: string;
}

@InputType()
export class GetUserInputType {
  @Field(() => ID)
  _id: string;
}

@InputType()
export class CreateUserInputType {
  @Field(() => String, { nullable: false })
  @IsAlpha()
  @Length(2, 32)
  username: string;

  @Field(() => String, { nullable: false })
  @Length(8, 32)
  password: string;
}

@InputType()
export class UpdateUserInputType {
  @Field(() => ID, { nullable: false })
  _id: string;

  @Field(() => String, { nullable: true })
  @IsAlpha()
  @Length(2, 32)
  @IsOptional()
  username: string;
}
