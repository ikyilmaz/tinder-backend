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
  async like(toUserId: string, currentUser: IUser) {
    // const isMatch: Reaction = await this.isMatch(currentUser.id, toUserId);
    // if (isMatch) {
    //   const match = this.matchService.createMatch(toUserId, currentUser.id); // notify order
    //   this.reactionRepository.remove(isMatch); //remove related reaction once match is created
    //   return match;
    // }
    // const like = new Reaction();
    // like.type = ReactionEnum.LIKE;
    // like.toUserId = toUserId;
    // like.fromUserId = currentUser.id;
    // try {
    //   await like.save();
    // } catch (error) {
    //   throw new ConflictException();
    // }
    // return like;
  }

  async isMatch(fromUserId: number, toUserId: number) {
    //true if toUser liked me first
    // return await this.reactionRepository.findOne({
    //   where: { fromUserId: toUserId, toUserId: fromUserId, type: 'LIKE' },
    // });
  }
}
