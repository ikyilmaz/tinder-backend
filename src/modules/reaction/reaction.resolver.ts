import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { IUser } from '../user/user.interface';
import { ReactionReturnType, ReactionInputType } from './reaction.graphql';
import { ReactionService } from './reaction.service';

@Resolver()
export class ReactionResolver {
  constructor(private readonly reactionService: ReactionService) {}

  @Auth()
  @Mutation(() => ReactionReturnType)
  async like(
    @Args('data') data: ReactionInputType,
    @CurrentUser() user: IUser,
  ) {
    return this.reactionService.like(data.toUserId, user);
  }

  @Auth()
  @Mutation(() => ReactionReturnType)
  async superLike(
    @Args('data') data: ReactionInputType,
    @CurrentUser() user: IUser,
  ) {
    return this.reactionService.superLike(data.toUserId, user);
  }

  @Auth()
  @Mutation(() => ReactionReturnType)
  async dislike(
    @Args('data') data: ReactionInputType,
    @CurrentUser() user: IUser,
  ) {
    return this.reactionService.dislike(data.toUserId, user);
  }
}
