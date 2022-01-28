import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UpdateUserLinkService } from '../../src/user-link/update-user-link.service';
import { FindUserLinkService } from '../../src/user-link/find-user-link.service';
import { UserLink } from '../../src/user-link/user-link.entity';
import { userLinkMock, userLinkRepositoryMock } from '../mock/user-link';

describe('UpdateUserLinkService', () => {
  let service: UpdateUserLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserLinkService,
        FindUserLinkService,
        {
          provide: getRepositoryToken(UserLink),
          useValue: userLinkRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UpdateUserLinkService>(UpdateUserLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a user link', () => {
    const payload = { ...userLinkMock, title: 'Updated title' };

    return service
      .update(userLinkMock.user as string, userLinkMock.id, payload)
      .then((result) => {
        expect(result.id).toBe(payload.id);
        expect(result.title).toBe(payload.title);
      });
  });
});
