import { Test, TestingModule } from '@nestjs/testing';

import { FindUserLinkService } from '../../src/user-link/find-user-link.service';

describe('FindUserLinkService', () => {
  let _service: FindUserLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserLinkService],
    }).compile();

    _service = module.get<FindUserLinkService>(FindUserLinkService);
  });

  it.todo('should be defined');

  describe('find user links', () => {
    it.todo('should list all user links');
    it.todo('should list all user links without the deleted ones');
  });
});
