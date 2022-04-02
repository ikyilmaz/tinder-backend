import mongoose from 'mongoose';

export interface IMatch {
  id: string;

  // Birinci kullanıcı
  firstUserId: mongoose.ObjectId;

  // İkinci kullanıcı
  secondUserId: mongoose.ObjectId;

  // messages: Message[]

  // Oluşturulma Tarihi
  createdAt: Date;

  // Son Güncelleme Tarihi
  updatedAt: Date;
}
