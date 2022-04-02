import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionResolver } from './reaction.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNameEnum } from 'src/shared/constants/model-name.constant';
import ReactionSchema from './reaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNameEnum.REACTION, schema: ReactionSchema },
    ]),
  ],
  providers: [ReactionService, ReactionResolver],
})
export class ReactionModule {}
