import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { PublicUserType } from 'src/modules/user/user.graphql';
import { IUser } from 'src/modules/user/user.interface';
import {
  LoginReturnType,
  LoginType,
  RegisterReturnType,
  RegisterType,
} from './auth.graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Auth()
  @Query(() => PublicUserType)
  async me(@CurrentUser() user: IUser) {
    return user;
  }

  @Query(() => LoginReturnType)
  async login(@Args('data') data: LoginType) {
    return this.authService.login(data);
  }

  @Mutation(() => RegisterReturnType)
  async register(
    @Args('data') data: RegisterType,
  ): Promise<RegisterReturnType> {
    return this.authService.register(data);
  }
}
