import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
