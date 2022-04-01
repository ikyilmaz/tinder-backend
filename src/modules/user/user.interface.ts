import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  id: string;

  // İsim
  firstName: string;

  // Soyisim
  lastName: string;

  // Kullanıcı adı
  username: string;

  // Şifre
  password: string;

  // Rol
  role: 'admin' | 'user';

  // Oluşturulma Tarihi
  createdAt: Date;

  // Son Güncelleme Tarihi
  updatedAt: Date;
}
