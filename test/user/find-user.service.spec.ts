import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../../src/user/user.entity';
import { FindUserService } from '../../src/user/find-user.service';
import { userMock, userRepositoryMock } from '../mock/user';

describe('FindUserService', () => {
  let service: FindUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<FindUserService>(FindUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find one', () => {
    it('should find an user by id', () => {
      expect(service.findOne('some-random-uuid')).resolves.toEqual(userMock);
    });
  });

  describe('find one by username', () => {
    it('should find an user by username', () => {
      expect(service.findOneByUsername(userMock.username)).resolves.toEqual(
        userMock,
      );
    });
  });
});
