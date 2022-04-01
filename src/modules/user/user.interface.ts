import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  _id: string;

  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: 'admin' | 'user';

  createdAt: Date;
  updatedAt: Date;
}