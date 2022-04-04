import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { PublicUserType } from '../user/user.graphql';
import { IUser } from '../user/user.interface';
import { MatchReturnType } from './match.graphql';
import { MatchService } from './match.service';

@Resolver()
export class MatchResolver {
  constructor(
    private readonly matchService: MatchService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Auth()
  @Query(() => [MatchReturnType], {
    name: 'matches',
  })
  async getMatchedPartnersByUserId(@CurrentUser() user: IUser) {
    return this.matchService.getMatchedPartnersByUserId(user.id);
  }

  // @ResolveProperty((returns) => [Message])
  // async messages(@Parent() match: Match): Promise<Message[]> {
  //   return await this.messageService.getMessagesByMatchId(match.id);
  // }

  @Auth()
  @Subscription(() => MatchReturnType, {
    filter: (payload, variables: { token: string }, context) => {
      console.log(context);
      console.log('p', payload.matchAdded.firstUserId, variables.token);
      return payload.matchAdded.firstUserId === variables.token;
    },
  })
  matchAdded(@Args('token') token: string) {
    return this.pubSub.asyncIterator('matchAdded');
  }
}
