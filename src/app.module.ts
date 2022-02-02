import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserLinkModule } from './user-link/user-link.module';
import { UserLinkKindModule } from './user-link-kind/user-link-kind.module';
import LoggerMiddleware from './lib/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('database.sync'),
        verboseRetryLog: true,
      }),
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        debug: true,
        playground: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        fieldResolverEnhancers: ['guards', 'interceptors'],
        context: ({ req, res }) => ({ req, res }),
        cors: {
          origin: configService.get<string>('frontendDomain'),
          credentials: true,
        },
      }),
    }),
    AuthModule,
    UserModule,
    UserLinkModule,
    UserLinkKindModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
