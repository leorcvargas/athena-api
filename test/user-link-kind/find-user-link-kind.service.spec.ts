import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  UserLinkKind,
  UserLinkKindEnum,
} from '../../src/user-link-kind/user-link-kind.entity';
import { FindUserLinkKindService } from '../../src/user-link-kind/find-user-link-kind.service';
import { userLinkKindRepositoryMock } from '../mock/user-link-kind';

describe('FindUserLinkKindService', () => {
  let service: FindUserLinkKindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserLinkKindService,
        {
          provide: getRepositoryToken(UserLinkKind),
          useValue: userLinkKindRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<FindUserLinkKindService>(FindUserLinkKindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should find one by id', () => {
      return service.findOne('abc').then((userLinkKind) => {
        expect(userLinkKind).toBeDefined();
        expect(userLinkKind.id).toBe('abc');
      });
    });

    it('should find one by kind', () => {
      return service
        .findOneByKind(UserLinkKindEnum.BASIC)
        .then((userLinkKind) => {
          expect(userLinkKind).toBeDefined();
          expect(userLinkKind.value).toBe(UserLinkKindEnum.BASIC);
        });
    });
  });

  describe('findAll', () => {
    it('should find all kinds', () => {
      return service.findAll().then((userLinkKinds) => {
        const kinds: UserLinkKindEnum[] = Object.keys(UserLinkKindEnum)
          .filter((key) => isNaN(Number(key)) === false)
          .map((key) => UserLinkKindEnum[key]);

        kinds.forEach((kind) => {
          const result = userLinkKinds.find(({ value }) => value === kind);
          expect(result?.value).toBe(kind);
        });
      });
    });
  });
});
