import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';

import { LoginResolver } from '../../src/auth/login.resolver';
import { UserService } from '../../src/user/user.service';
import { User } from '../../src/user/user.entity';
import { userRepositoryMock } from '../mock/user';
import { LoginService } from '../../src/auth/login.service';
import { HashService } from '../../src/auth/hash.service';
import { ValidateUserService } from '../../src/auth/validate-user.service';

describe('LoginResolver', () => {
  let resolver: LoginResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
        UserService,
        LoginService,
        HashService,
        ValidateUserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    resolver = module.get<LoginResolver>(LoginResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
