import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ModelNameEnum } from 'src/shared/constants/model-name.constant';
import { IUser } from '../user/user.interface';
import { REACTION_TYPE } from './reaction.enum';
import { IReaction } from './reaction.interface';

@Injectable()
export class ReactionService {
  constructor(
    @InjectModel(ModelNameEnum.REACTION)
    readonly reactionModel: mongoose.Model<IReaction>,
  ) {}

  async dislike(toUserId: string, currentUser: IUser) {
    const dislike = await this.reactionModel.create({
      toUserId,
      fromUserId: currentUser.id,
      type: REACTION_TYPE.DISLIKE,
    });

    return dislike;
  }

  //   async like(toUserId: number, currentUser: User): Promise<Reaction | Match> {
  async like(toUserId: string, user: IUser) {
    const isMatch = await this.isMatch(user.id, toUserId);
    if (isMatch) {
      // const match = this.matchService.createMatch(toUserId, currentUser.id); // notify order
      // this.reactionModel.findByIdAndRemove(isMatch.id); //remove related reaction once match is created
      // return match;
    }
    const like = await this.reactionModel.create({
      toUserId,
      fromUserId: user.id,
      type: REACTION_TYPE.LIKE,
    });

    // TODO: Conflict Exception
    return like;
  }

  async superLike(toUserId: string, user: IUser) {
    const isMatch = await this.isMatch(user.id, toUserId);
    if (isMatch) {
      // const match = this.matchService.createMatch(toUserId, currentUser.id); // notify order
      // this.reactionModel.findByIdAndRemove(isMatch.id); //remove related reaction once match is created
      // return match;
    }
    const like = await this.reactionModel.create({
      toUserId,
      fromUserId: user.id,
      type: REACTION_TYPE.SUPERLIKE,
    });

    // TODO: Conflict Exception
    return like;
  }

  async isMatch(fromUserId: string, toUserId: string) {
    // true if toUser liked me first
    return await this.reactionModel.findOne({
      where: {
        fromUserId: toUserId,
        toUserId: fromUserId,
        type: {
          $or: [REACTION_TYPE.LIKE, REACTION_TYPE.SUPERLIKE],
        },
      },
    });
  }
}
