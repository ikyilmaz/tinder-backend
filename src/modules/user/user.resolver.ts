import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  CreateUserInputType,
  UpdateUserInputType,
  PublicUserType,
  GetUserInputType,
} from './user.graphql';
import { PubSub } from 'graphql-subscriptions';
import { Inject, UseGuards } from '@nestjs/common';
import { ParseMongoIdPipe } from 'src/pipes/parse-mongo-id.pipe';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
// import { Auth } from '../../common/decorators/auth.decorator';

@Resolver(() => PublicUserType)
export class UserResolver {
  constructor(
    @Inject('PUB_SUB') private readonly $pubSub: PubSub,
    private readonly usersService: UserService,
  ) {}

  @Query(() => [PublicUserType])
  async users() {
    return this.usersService.getMany();
  }

  @Query(() => PublicUserType)
  async user(@Args('data') data: GetUserInputType) {
    return this.usersService.get(data);
  }

  // @Auth({ roles: ['admin'] })
  @Mutation(() => PublicUserType)
  async createUser(@Args('data') data: CreateUserInputType) {
    const user = await this.usersService.create(data);
    await this.$pubSub.publish('on-user-created', user);
    return user;
  }

  // @Auth({ roles: ['admin'] })
  @Mutation(() => PublicUserType)
  async updateUser(@Args('data') data: UpdateUserInputType) {
    return this.usersService.update(data);
  }

  // @Auth({ roles: ['admin'] })
  @Mutation(() => String)
  async deleteUser(@Args('id', ParseMongoIdPipe) id: string) {
    await this.usersService.delete(id);
    return 'OK';
  }

  // @Auth({ roles: ['admin'] })
  @Subscription(() => PublicUserType, {
    resolve: (payload) => payload,
  })
  async userCreated(@Args('token') token: string) {
    return this.$pubSub.asyncIterator<PublicUserType>('on-user-created');
  }
}
