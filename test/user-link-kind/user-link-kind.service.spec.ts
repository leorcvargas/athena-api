import { Test, TestingModule } from '@nestjs/testing';
import { UserLinkKindService } from '../../src/user-link-kind/user-link-kind.service';

describe('UserLinkKindService', () => {
  let service: UserLinkKindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLinkKindService],
    }).compile();

    service = module.get<UserLinkKindService>(UserLinkKindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
