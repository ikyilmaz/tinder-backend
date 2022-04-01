import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './modules/user/user.resolver';
import { UserModule } from './modules/user/user.module';

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
    }),
    UserModule,
  ],
})
export class AppModule {}
