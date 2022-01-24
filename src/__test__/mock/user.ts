import { User } from '../../user/user.entity';

export const userMock: User = {
  id: 1,
  username: 'leorcvargas',
  password: 'foobar',
  email: 'leorcvargas@dev.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const usersMock: User[] = [
  {
    id: 1,
    username: 'leorcvargas',
    password: 'foobar',
    email: 'leorcvargas@dev.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    username: 'amazinguser',
    password: 'foobar',
    email: 'amazinguser@dev.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 3,
    username: 'deleteduser',
    password: 'foobar',
    email: 'deleted_users@dev.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

export const userServiceMock = {
  findOneByUsername: jest.fn().mockResolvedValue(userMock),
  findOne: jest.fn().mockResolvedValue(userMock),
};

export const userRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(userMock),
};
