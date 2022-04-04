import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReactionModule } from './modules/reaction/reaction.module';
import { MatchModule } from './modules/match/match.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [
    // Env vars...
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: 'mongodb://root:example@localhost:27017',

          // useNewUrlParser: true,
          // useCreateIndex: true,
          // useFindAndModify: false,
          // useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),

    // GraphQL'i projeye dahil edelim
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
    }),
    UserModule,
    AuthModule,
    ReactionModule,
    MatchModule,
    MessageModule,
  ],
})
export class AppModule {}
