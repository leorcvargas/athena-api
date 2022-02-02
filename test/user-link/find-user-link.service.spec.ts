import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserLink } from '../../src/user-link/user-link.entity';
import { FindUserLinkService } from '../../src/user-link/find-user-link.service';
import { userLinkRepositoryMock } from '../mock/user-link';
import { userMock } from '../../test/mock/user';

describe('FindUserLinkService', () => {
  let service: FindUserLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserLinkService,
        {
          provide: getRepositoryToken(UserLink),
          useValue: userLinkRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<FindUserLinkService>(FindUserLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all user links', () => {
    return service.findByUser(userMock.id).then((userLinks) => {
      userLinks.forEach((userLink) => {
        expect(userLink.user).toBe(userMock.id);
      });
    });
  });

  it('should not contain deleted user links', () => {
    const promise = service.findByUser(userMock.id);

    return promise.then((userLinks) => {
      userLinks.forEach((userLink) => {
        expect(userLink.deletedAt).toBeNull();
      });
    });
  });
});
