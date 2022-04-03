import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchResolver } from './match.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNameEnum } from 'src/shared/constants/model-name.constant';
import MatchSchema from './match.schema';
import { PubSub } from 'graphql-subscriptions';
import UserSchema from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNameEnum.MATCH, schema: MatchSchema },
      { name: ModelNameEnum.USER, schema: UserSchema },
    ]),
  ],
  providers: [
    MatchResolver,
    MatchService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [MatchService],
})
export class MatchModule {}
