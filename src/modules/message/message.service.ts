import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationError } from 'apollo-server-express';
import mongoose from 'mongoose';
import { ModelNameEnum } from 'src/shared/constants/model-name.constant';
import { IMatch } from '../match/match.interface';
import { AddMessageInputType } from './message.graphql';
import { IMessage } from './message.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(ModelNameEnum.MESSAGE)
    private readonly messageModel: mongoose.Model<IMessage>,
    @InjectModel(ModelNameEnum.MATCH)
    private readonly matchModel: mongoose.Model<IMatch>,
  ) {}

  async getMessagesByMatchId(matchId: string, userId: string) {
    await this.isMatchOwner(matchId, userId);
    return this.messageModel.find({ matchId });
  }

  async addMessage(userId: string, { matchId, content }: AddMessageInputType) {
    await this.isMatchOwner(matchId, userId);

    const message = await this.messageModel.create({
      content,
      matchId,
      senderUserId: userId,
    });

    return message;
  }

  private async isMatchOwner(matchId, userId) {
    const match = await this.matchModel.findById(matchId);
    const matchObj = match.toObject();

    if (
      !(
        matchObj.firstUserId.toString() === userId ||
        matchObj.secondUserId.toString() === userId
      )
    )
      throw new AuthenticationError('The match owner is not you');
  }
}
