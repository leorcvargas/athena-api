import { Test, TestingModule } from '@nestjs/testing';
import { UserLinkKindResolver } from '../../src/user-link-kind/user-link-kind.resolver';

describe('UserLinkKindResolver', () => {
  let _service: UserLinkKindResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLinkKindResolver],
    }).compile();

    _service = module.get<UserLinkKindResolver>(UserLinkKindResolver);
  });

  it.todo('should be defined');
});
