import { InputType, Field, ObjectType, ID, OmitType } from '@nestjs/graphql';
import { IsAlpha, Length } from 'class-validator';
import { PublicUserType } from 'src/modules/user/user.graphql';

// giriş tipleri başladı
@InputType()
export class LoginType {
  @Field(() => String, { nullable: false })
  @IsAlpha()
  @Length(2, 32)
  username: string;

  @Field(() => String, { nullable: false })
  @Length(8, 32)
  password: string;
}

@ObjectType()
export class LoginReturnType {
  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => PublicUserType, { nullable: false })
  user: PublicUserType;
}
// giriş tipleri bitti

// kayıt tipleri başladı
@InputType()
export class RegisterType {
  @Field(() => String, { nullable: false })
  @IsAlpha()
  @Length(2, 32)
  username: string;

  @Field(() => String, { nullable: false })
  @Length(8, 32)
  password: string;

  @Field(() => String, { nullable: false })
  @Length(8, 32)
  passwordConfirm: string;
}

@ObjectType()
export class RegisterReturnType {
  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => PublicUserType, { nullable: false })
  user: PublicUserType;
}
// kayıt tipleri bitti
