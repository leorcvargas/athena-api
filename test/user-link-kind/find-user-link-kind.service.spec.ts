import { Test, TestingModule } from '@nestjs/testing';
import { FindUserLinkKindService } from '../../src/user-link-kind/find-user-link-kind.service';

describe('FindUserLinkKindService', () => {
  let _service: FindUserLinkKindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserLinkKindService],
    }).compile();

    _service = module.get<FindUserLinkKindService>(FindUserLinkKindService);
  });

  it.todo('should be defined');

  it.todo('should find one kind');

  it.todo('should find all kinds');
});
