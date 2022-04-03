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
  @Mutation(() => String, { description: 'Beğenmek için' })
  async like(
    @Args('data') data: ReactionInputType,
    @CurrentUser() user: IUser,
  ) {
    await this.reactionService.like(data.toUserId, user);

    return 'OK';
  }

  @Auth()
  @Mutation(() => String, {
    description: 'Süper bir şekilde beğenmek için. İnanılmaz süper...',
  })
  async superLike(
    @Args('data') data: ReactionInputType,
    @CurrentUser() user: IUser,
  ) {
    await this.reactionService.superLike(data.toUserId, user);

    return 'OK';
  }

  @Auth()
  @Mutation(() => String, { description: 'Beğenmemek için :(' })
  async dislike(
    @Args('data') data: ReactionInputType,
    @CurrentUser() user: IUser,
  ) {
    await this.reactionService.dislike(data.toUserId, user);

    return 'OK';
  }
}
