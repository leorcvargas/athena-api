import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';

import { SignUpResolver } from '../../src/auth/sign-up.resolver';
import { User } from '../../src/user/user.entity';
import { userRepositoryMock } from '../mock/user';
import { SignUpService } from '../../src/auth/sign-up.service';
import { HashService } from '../../src/auth/hash.service';
import { CreateUserService } from '../../src/user/create-user.service';

describe('SignUpResolver', () => {
  let resolver: SignUpResolver;

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
        SignUpResolver,
        CreateUserService,
        SignUpService,
        HashService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    resolver = module.get<SignUpResolver>(SignUpResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
