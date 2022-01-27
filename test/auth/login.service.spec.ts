import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { ValidateUserService } from '../../src/auth/validate-user.service';
import { HashService } from '../../src/auth/hash.service';
import { LoginService } from '../../src/auth/login.service';
import { UserService } from '../../src/user/user.service';
import { userMock, userServiceMock } from '../mock/user';

const moduleMocker = new ModuleMocker(global);

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret-key',
          signOptions: { expiresIn: '7d' },
        }),
      ],
      providers: [ValidateUserService, HashService, LoginService],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return userServiceMock;
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfuly login and return access key', () => {
    const { id, username } = userMock;
    return service.login(username, 'foobar123').then((data) => {
      expect(data).toBeDefined();
      expect(data.accessToken).toBeDefined();
      expect(data.user.id).toBe(id);
    });
  });
});
