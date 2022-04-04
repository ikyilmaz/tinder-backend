import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from './user.schema';
import { PubSub } from 'graphql-subscriptions';
import { PubSubModule } from '../pub-sub/pub-sub.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PubSubModule,
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
