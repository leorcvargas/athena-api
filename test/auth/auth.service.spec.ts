import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { UserService } from '../../src/user/user.service';
import { AuthService } from '../../src/auth/auth.service';
import { userMock, userServiceMock } from '../mock/user';

const moduleMocker = new ModuleMocker(global);

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret-key',
          signOptions: { expiresIn: '7d' },
        }),
      ],
      providers: [AuthService],
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate user', () => {
    it('should return a valid user', () => {
      const password = 'foobar';

      const { password: _removedPassword, ...expectedResult } = userMock;

      return service
        .validateUser(userMock.username, password)
        .then((data) => expect(data).toEqual(expectedResult));
    });

    it('should return null for an invalid user', () => {
      const wrongPassword = 'wrong_password';

      return service
        .validateUser(userMock.username, wrongPassword)
        .then((data) => expect(data).toBeNull());
    });
  });

  describe('sign up', () => {
    it('should successfuly sign up a new user', () => {
      const { email, username } = userMock;
      const password = 'foobar';

      return service.signUp(email, username, password).then((data) => {
        expect(data.username).toBe(username);
        expect(data.email).toBe(email);
        expect(data.password).not.toBe(password);
      });
    });
  });

  describe('login', () => {
    it('should successfuly login and return access key', () => {
      return service.login(userMock).then((data) => {
        expect(data.accessToken).toBeDefined();
      });
    });
  });
});
