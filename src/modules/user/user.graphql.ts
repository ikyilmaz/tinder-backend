import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsAlpha, IsMongoId, IsOptional, Length } from 'class-validator';

@ObjectType({
  description: 'Herkese açık kullanıcı tipi',
})
export class PublicUserType {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: false })
  username: string;
}

@InputType({
  description:
    "ID'sine bağlı kullanıcı sorgusu yaparken kullanılacak giriş tipi...",
})
export class GetUserInputType {
  @Field(() => ID)
  @IsMongoId()
  _id: string;
}

@InputType({
  description: 'Kullanıcı oluştururken kullanılacak giriş tipi...',
})
export class CreateUserInputType {
  @Field(() => String, { nullable: false })
  @IsAlpha()
  @Length(2, 32)
  username: string;

  @Field(() => String, { nullable: false })
  @Length(8, 32)
  password: string;
}

@InputType({
  description: 'Kullanıcı güncellerken kullanılacak giriş tipi...',
})
export class UpdateUserInputType {
  @Field(() => ID, { nullable: false })
  @IsMongoId()
  _id: string;

  @Field(() => String, { nullable: true })
  @IsAlpha()
  @Length(2, 32)
  @IsOptional()
  username: string;
}
