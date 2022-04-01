import mongoose from 'mongoose';
import { REACTION_TYPE } from './reaction.enum';

export interface IReaction extends mongoose.Document {
  id: string;

  // Reaksiyon tipi
  type: REACTION_TYPE;

  // Reaksiyonu veren kişi
  fromUserId: number;

  // Reaksiyonu alan kişi
  toUserId: number;

  // Oluşturulma Tarihi
  createdAt: Date;

  // Son Güncelleme Tarihi
  updatedAt: Date;
}
