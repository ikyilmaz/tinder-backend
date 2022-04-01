import mongoose from 'mongoose';
import { USER_ROLE } from './user.enum';

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
  role: USER_ROLE;

  // Oluşturulma Tarihi
  createdAt: Date;

  // Son Güncelleme Tarihi
  updatedAt: Date;
}
