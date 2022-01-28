import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserLink } from '../../src/user-link/user-link.entity';
import { userLinkMock, userLinkRepositoryMock } from '../mock/user-link';
import { DeleteUserLinkService } from '../../src/user-link/delete-user-link.service';

describe('DeleteUserLinkService', () => {
  let service: DeleteUserLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserLinkService,
        {
          provide: getRepositoryToken(UserLink),
          useValue: userLinkRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<DeleteUserLinkService>(DeleteUserLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('delete an user link', () => {
    const { id, user } = userLinkMock;

    return service.delete(user as string, id).then((result) => {
      expect(result).toBeDefined();
      expect(result.affected).toBe(1);
    });
  });
});
