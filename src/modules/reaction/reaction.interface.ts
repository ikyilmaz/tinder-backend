import mongoose from 'mongoose';
import { REACTION_TYPE } from './reaction.enum';

export interface IReaction extends mongoose.Document {
  id: string;

  // Reaksiyon tipi
  type: REACTION_TYPE;

  // Reaksiyonu veren kişi
  fromUserId: mongoose.ObjectId;

  // Reaksiyonu alan kişi
  toUserId: mongoose.ObjectId;

  // Oluşturulma Tarihi
  createdAt: Date;

  // Son Güncelleme Tarihi
  updatedAt: Date;
}
