import { Test, TestingModule } from '@nestjs/testing';
import { UserLinkService } from '../../src/user-link/user-link.service';

describe('UserLinkService', () => {
  let service: UserLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLinkService],
    }).compile();

    service = module.get<UserLinkService>(UserLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it.todo('should create a new link');
    it.todo('should create a new link with the BASIC kind attached');
  });

  describe('delete', () => {
    it.todo('should delete a link');
  });

  describe('find user links', () => {
    it.todo('should list all user links');
    it.todo('should list all user links without the deleted ones');
  });
});
