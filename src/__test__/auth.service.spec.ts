/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { userMock, userServiceMock } from './mock/user';

const moduleMocker = new ModuleMocker(global);

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

  it('should return a valid user', () => {
    const { username, password } = userMock;

    const { password: removedPassword, ...expectedResult } = userMock;

    expect(service.validateUser(username, password)).resolves.toEqual(
      expectedResult,
    );
  });

  it('should return null for an invalid user', () => {
    const wrongPassword = 'wrong_password_123';

    expect(
      service.validateUser(userMock.username, wrongPassword),
    ).resolves.toEqual(null);
  });
});