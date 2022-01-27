import { Test, TestingModule } from '@nestjs/testing';

import { DeleteUserLinkService } from '../../src/user-link/delete-user-link.service';

describe('DeleteUserLinkService', () => {
  let _service: DeleteUserLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteUserLinkService],
    }).compile();

    _service = module.get<DeleteUserLinkService>(DeleteUserLinkService);
  });

  it.todo('should be defined');

  it.todo('delete an user link');
});
