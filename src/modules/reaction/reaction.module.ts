import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionResolver } from './reaction.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNameEnum } from 'src/shared/constants/model-name.constant';
import ReactionSchema from './reaction.schema';
import { MatchService } from '../match/match.service';
import { MatchModule } from '../match/match.module';

@Module({
  imports: [
    MatchModule,
    MongooseModule.forFeature([
      { name: ModelNameEnum.REACTION, schema: ReactionSchema },
    ]),
  ],
  providers: [ReactionService, ReactionResolver],
})
export class ReactionModule {}
