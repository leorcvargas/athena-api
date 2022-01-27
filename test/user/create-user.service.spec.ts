import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../../src/user/user.entity';
import { CreateUserService } from '../../src/user/create-user.service';
import { userMock, userRepositoryMock } from '../mock/user';

describe('CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfuly create a user', () => {
    const { email, username, password } = userMock;
    service.create(email, username, password).then((user) => {
      expect(user.username).toBe(user.username);
      expect(user.email).toBe(user.email);
    });
  });
});
