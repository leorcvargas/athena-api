import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { SignUpService } from '../../src/auth/sign-up.service';
import { UserService } from '../../src/user/user.service';
import { userMock, userServiceMock } from '../mock/user';

const moduleMocker = new ModuleMocker(global);

describe('SignUpService', () => {
  let service: SignUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignUpService],
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

    service = module.get<SignUpService>(SignUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

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
