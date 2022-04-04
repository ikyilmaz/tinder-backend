import mongoose from 'mongoose';

export interface IMessage {
  id: string;

  content: string;

  // gönderen kullanıcı
  senderUserId: mongoose.ObjectId;

  // eşleşme
  matchId: mongoose.ObjectId;

  // Oluşturulma Tarihi
  createdAt: Date;

  // Son Güncelleme Tarihi
  updatedAt: Date;
}
