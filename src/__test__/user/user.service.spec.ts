import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { userMock, userRepositoryMock } from '../mock/user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find one', () => {
    it('should find an user by id', () => {
      expect(service.findOne(1)).resolves.toEqual(userMock);
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
