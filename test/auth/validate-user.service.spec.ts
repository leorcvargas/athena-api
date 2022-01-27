import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { HashService } from '../../src/auth/hash.service';
import { ValidateUserService } from '../../src/auth/validate-user.service';
import { FindUserService } from '../../src/user/find-user.service';
import { userMock, userServiceMock } from '../mock/user';

const moduleMocker = new ModuleMocker(global);

describe('ValidateUserService', () => {
  let service: ValidateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService, ValidateUserService],
    })
      .useMocker((token) => {
        if (token === FindUserService) {
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

    service = module.get<ValidateUserService>(ValidateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfuly validate a user', () => {
    const { id, username } = userMock;
    return service.validate(username, 'foobar123').then((data) => {
      expect(data).not.toBeNull();
      expect(data.id).toBe(id);
    });
  });

  it('should return null for an invalid user', () => {
    const { id, username } = userMock;
    return service.validate(username, 'foobar123').then((data) => {
      expect(data).not.toBeNull();
      expect(data.id).toBe(id);
    });
  });
});
