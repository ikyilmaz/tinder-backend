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
import { RestrictToGuard } from 'src/guards/restrict-to.guard';
import { Auth } from 'src/decorators/auth.decorator';
// import { Auth } from '../../common/decorators/auth.decorator';

@Resolver(() => PublicUserType)
export class UserResolver {
  constructor(
    @Inject('PUB_SUB') private readonly $pubSub: PubSub,
    private readonly usersService: UserService,
  ) {}

  @Query(() => [PublicUserType], { description: 'Tüm kullanıcıları bulur...' })
  async findUsers() {
    return this.usersService.getMany();
  }

  @Query(() => PublicUserType, {
    description: "Verilen ID'ye sahip kullanıcıyı bulur...",
  })
  async findOneUser(@Args('data') data: GetUserInputType) {
    return this.usersService.get(data);
  }

  @Auth({ roles: ['admin'] })
  @Mutation(() => PublicUserType, {
    description: 'Kullanıcı oluşturur. Rolüm admin değilse izin vermez.',
  })
  async createUser(@Args('data') data: CreateUserInputType) {
    const user = await this.usersService.create(data);
    await this.$pubSub.publish('on-user-created', user);
    return user;
  }

  @Auth({ roles: ['admin'] })
  @Mutation(() => PublicUserType, {
    description: 'Kullanıcı günceller. Rolüm admin değilse izin vermez.',
  })
  async updateUser(@Args('data') data: UpdateUserInputType) {
    return this.usersService.update(data);
  }

  @Auth({ roles: ['admin'] })
  @UseGuards(GqlAuthGuard, RestrictToGuard)
  @Mutation(() => String, {
    description: 'Kullanıcı siler. Rolüm admin değilse izin vermez.',
  })
  async deleteUser(@Args('id', ParseMongoIdPipe) id: string) {
    await this.usersService.delete(id);
    return 'OK';
  }

  @Auth({ roles: ['admin'] })
  @Subscription(() => PublicUserType, {
    resolve: (payload) => payload,
    description:
      'Kullanıcı oluşturma olayını takibe alır. Her kullanıcı oluşturulduğunda haberim olur. Rolüm admin değilse izin vermez.',
  })
  async userCreated(@Args('token') token: string) {
    return this.$pubSub.asyncIterator<PublicUserType>('on-user-created');
  }
}
