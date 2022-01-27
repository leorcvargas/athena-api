import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

import { UserLinkResolver } from '../../src/user-link/user-link.resolver';
import { FindUserLinkService } from '../../src/user-link/find-user-link.service';
import { findUserLinkServiceMock } from '../mock/user-link';

const moduleMocker = new ModuleMocker(global);

describe('UserLinkResolver', () => {
  let _service: UserLinkResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLinkResolver],
    })
      .useMocker((token) => {
        if (token === FindUserLinkService) {
          return findUserLinkServiceMock;
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

    _service = module.get<UserLinkResolver>(UserLinkResolver);
  });

  it.todo('should be defined');
});
