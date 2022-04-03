import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import mongoose from 'mongoose';
import { ModelNameEnum } from 'src/shared/constants/model-name.constant';
import { IUser } from '../user/user.interface';
import { IMatch } from './match.interface';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(ModelNameEnum.MATCH)
    private readonly matchModel: mongoose.Model<IMatch>,
    @InjectModel(ModelNameEnum.USER)
    private readonly userModel: mongoose.Model<IUser>,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  // Match Oluştur
  async createMatch(firstUserId: string, secondUserId: string) {
    const match = await this.matchModel.create({
      firstUserId,
      secondUserId,
    });

    // TODO: Conflict Exception

    this.pubSub.publish('matchAdded', { matchAdded: match });
    return match;
  }

  // Match olunan kişileri ID'lerine göre getirme
  async getMatchedPartnersByUserId(userId: string) {
    // Matchlerimi alıyorum. Birinci kullanıcı da olabilirim ikinci kullanıcı da...
    const matches = await this.matchModel.find({
      $or: [
        {
          firstUserId: userId,
        },
        {
          secondUserId: userId,
        },
      ],
    });

    // Bu matchlerin ID'lerini alıyorum
    const matchesIds = matches.map((match) => match.id);

    // Bu matchlerdeki karşı tarafın ID'lerini alıyorum
    const matchedUsersIds = matches.map((match) => {
      // Match içerisinde ki birinci kullanıcı (firstUserId) ben değil isem birinci kullanıcı karşı taraf
      // Eğer ben birinci kullanıcı isem ikinci kullanıcı (secondUserId) karşı taraf
      return match.firstUserId.toString() != userId
        ? match.firstUserId
        : match.secondUserId;
    });

    // Karşı tarafta ki kullanıcıları aratıyorum
    const matchedUsers = await this.userModel.find({
      _id: { $in: matchedUsersIds },
    });

    // Ardından Match IDleri ile birlikte bu kullanıcıları dönüyorum...
    return matchedUsers.map((user, i) => {
      const userDoc = user.toJSON();
      return { user: userDoc, matchId: matchesIds[i] };
    });
  }
}
