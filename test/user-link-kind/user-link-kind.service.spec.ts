import { Test, TestingModule } from '@nestjs/testing';
import { UserLinkKindService } from '../../src/user-link-kind/user-link-kind.service';

describe('UserLinkKindService', () => {
  let _service: UserLinkKindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLinkKindService],
    }).compile();

    _service = module.get<UserLinkKindService>(UserLinkKindService);
  });

  it.todo('should be defined');
});
