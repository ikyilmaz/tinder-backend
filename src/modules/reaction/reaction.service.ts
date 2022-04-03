import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ModelNameEnum } from 'src/shared/constants/model-name.constant';
import { MatchService } from '../match/match.service';
import { IUser } from '../user/user.interface';
import { REACTION_TYPE } from './reaction.enum';
import { IReaction } from './reaction.interface';

@Injectable()
export class ReactionService {
  constructor(
    @InjectModel(ModelNameEnum.REACTION)
    readonly reactionModel: mongoose.Model<IReaction>,
    private readonly matchService: MatchService,
  ) {}

  // Biri beğenilmediğinde kullanılacak fonksiyon
  async dislike(toUserId: string, currentUser: IUser) {
    // Beğenmeme reaksiyonu
    await this.reactionModel.create({
      toUserId,
      fromUserId: currentUser.id,
      type: REACTION_TYPE.DISLIKE,
    });
  }

  // Biri beğenilince kullanılacak fonksiyon
  async like(toUserId: string, user: IUser) {
    // Öncelikle bu beğeneceği kişi onu daha önce beğenmiş mi? Ona bak...
    const isMatch = await this.isMatch(user.id, toUserId);

    // Daha önce beğenilmiş mi?
    if (isMatch) {
      // Yeni bir match oluştur...
      const match = await this.matchService.createMatch(toUserId, user.id);

      // Rekasiyonu silelim. Match oluştu çünkü...
      await this.reactionModel.findOneAndRemove({
        fromUserId: toUserId,
      });

      // Matchi döndür
      return match;
    }

    // Eğer daha önce bu kişi tarafından beğenilmediyse normal bir şekilde reaksiyon oluştur...
    await this.reactionModel.create({
      toUserId,
      fromUserId: user.id,
      type: REACTION_TYPE.LIKE,
    });
  }

  // Yukarıdaki like fonksiyonu için geçerli olan her şey burada da geçerli
  async superLike(toUserId: string, user: IUser) {
    // Öncelikle bu beğeneceği kişi onu daha önce beğenmiş mi? Ona bak...
    const isMatch = await this.isMatch(user.id, toUserId);

    // Daha önce beğenilmiş mi?
    if (isMatch) {
      // Yeni bir match oluştur...
      const match = await this.matchService.createMatch(toUserId, user.id);

      // Rekasiyonu silelim. Match oluştu çünkü...
      await this.reactionModel.findOneAndRemove({
        fromUserId: toUserId,
      });

      // Matchi döndür
      return match;
    }

    // Eğer daha önce bu kişi tarafından beğenilmediyse normal bir şekilde reaksiyon oluştur...
    await this.reactionModel.create({
      toUserId,
      fromUserId: user.id,
      type: REACTION_TYPE.SUPERLIKE, // Bu hariç
    });
  }

  // Match mi değil mi?
  async isMatch(fromUserId: string, toUserId: string) {
    // Bu kişi daha önce bizi beğenmiş mi?
    const match = await this.reactionModel.findOne({
      where: {
        fromUserId: toUserId,
        toUserId: fromUserId,
        type: {
          $or: [REACTION_TYPE.LIKE, REACTION_TYPE.SUPERLIKE],
        },
      },
    });

    return match;
  }
}
