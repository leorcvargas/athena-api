import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateUserLinkService } from '../../src/user-link/create-user-link.service';
import { FindUserLinkKindService } from '../../src/user-link-kind/find-user-link-kind.service';
import { UserLink } from '../../src/user-link/user-link.entity';
import { userLinkMock, userLinkRepositoryMock } from '../mock/user-link';
import {
  UserLinkKind,
  UserLinkKindEnum,
} from '../../src/user-link-kind/user-link-kind.entity';
import { userLinkKindRepositoryMock } from '../mock/user-link-kind';

describe('CreateUserLinkService', () => {
  let service: CreateUserLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserLinkService,
        FindUserLinkKindService,
        {
          provide: getRepositoryToken(UserLink),
          useValue: userLinkRepositoryMock,
        },
        {
          provide: getRepositoryToken(UserLinkKind),
          useValue: userLinkKindRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CreateUserLinkService>(CreateUserLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new link', () => {
    const { url, user } = userLinkMock;
    return service
      .create({
        url,
        user: user as number,
        kind: UserLinkKindEnum.BASIC,
      })
      .then((userLink) => {
        expect(userLink).toBeDefined();
      });
  });
});
