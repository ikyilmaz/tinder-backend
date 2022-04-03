import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { PublicUserType } from '../user/user.graphql';
import { IUser } from '../user/user.interface';
import { MatchReturnType } from './match.graphql';
import { MatchService } from './match.service';

@Resolver()
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Auth()
  @Query(() => [MatchReturnType], {
    name: 'matches',
  })
  async getMatchedPartnersByUserId(@CurrentUser() user: IUser) {
    return this.matchService.getMatchedPartnersByUserId(user.id);
  }
}
