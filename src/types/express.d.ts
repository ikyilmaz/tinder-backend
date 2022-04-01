import { IUser } from '../modules/user/user.interface';

// Request nesnesine bind ettiğim kullanıcının, tipini ekledim. Typescript kızmasın...
declare module 'express' {
  interface Request {
    user?: IUser & { _id: any };
  }
}
