import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SignUpService } from './sign-up.service';
import { HashService } from './hash.service';
import { LoginService } from './login.service';
import { ValidateUserService } from './validate-user.service';
import { LoginResolver } from './login.resolver';
import { SignUpResolver } from './sign-up.resolver';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [
    LoginResolver,
    SignUpResolver,
    SignUpService,
    LoginService,
    ValidateUserService,
    HashService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
