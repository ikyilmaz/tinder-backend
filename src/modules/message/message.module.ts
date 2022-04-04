import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNameEnum } from 'src/shared/constants/model-name.constant';
import MessageSchema from './message.schema';
import MatchSchema from '../match/match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNameEnum.MESSAGE, schema: MessageSchema },
      { name: ModelNameEnum.MATCH, schema: MatchSchema },
    ]),
  ],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
