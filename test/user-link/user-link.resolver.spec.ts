import { Test, TestingModule } from '@nestjs/testing';
import { UserLinkResolver } from '../../src/user-link/user-link.resolver';

describe('UserLinkResolver', () => {
  let service: UserLinkResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLinkResolver],
    }).compile();

    service = module.get<UserLinkResolver>(UserLinkResolver);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
