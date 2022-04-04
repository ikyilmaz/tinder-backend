import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { IUser } from '../user/user.interface';
import { AddMessageInputType, MessageReturnType } from './message.graphql';
import { MessageService } from './message.service';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Auth()
  @Query(() => [MessageReturnType], { name: 'messages' })
  async getMessagesByMatchId(
    @Args({ name: 'matchId', type: () => String }) matchId: string,
    @CurrentUser() user: IUser,
  ) {
    return this.messageService.getMessagesByMatchId(matchId, user.id);
  }

  @Auth()
  @Mutation(() => MessageReturnType)
  async addMessage(
    @Args('data') addMessageInput: AddMessageInputType,
    @CurrentUser() currentUser: IUser,
  ) {
    return await this.messageService.addMessage(
      currentUser.id,
      addMessageInput,
    );
  }
}
