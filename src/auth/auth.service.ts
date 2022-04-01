import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/modules/user/user.interface';
import { Model } from 'mongoose';
import {
  LoginReturnType,
  LoginType,
  RegisterReturnType,
  RegisterType,
} from './auth.graphql';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private userModel: Model<IUser>,
  ) {}

  // Giriş
  async login({ username, password }: LoginType): Promise<LoginReturnType> {
    // Verilen Kullanıcı Adı ile kayıt ara...
    const user = await this.userModel.findOne({ username });

    // Verilen Kullanıcı Adı ile kayıt bulunamadı...
    if (!user)
      throw new UnauthorizedException('username or password is not correct');

    // Verilen şifre doğru değil...
    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('username or password is not correct');

    console.log('hmmm');
    // Okeyto gönder...
    return {
      token: this.jwtService.sign({ id: user.id }),
      user,
    };
  }

  // Kayıt
  async register({
    username,
    password,
    passwordConfirm,
  }: RegisterType): Promise<RegisterReturnType> {
    // Şifreleri doğrula...
    if (password !== passwordConfirm)
      throw new BadRequestException("passwords don't match");

    // Kullanıcıyı oluştur...
    const user = await this.userModel.create({ username, password });

    // Token'ı oluşturup, kullanıcıyla birlikte gönder...
    return {
      token: this.jwtService.sign({ id: user.id }),
      user,
    };
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }
}
