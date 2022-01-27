import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

import { UserService } from '../../src/user/user.service';
import { userServiceMock } from '../mock/user';
import { UserLinkResolver } from '../../src/user-link/user-link.resolver';

const moduleMocker = new ModuleMocker(global);

describe('UserLinkResolver', () => {
  let service: UserLinkResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLinkResolver],
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

    service = module.get<UserLinkResolver>(UserLinkResolver);
  });

  it.todo('should be defined');
});
