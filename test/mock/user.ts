import { User } from '../../src/user/user.entity';

const passwordHash =
  '$2b$10$CshOVQVimvYxWlGM2v00zu05fRq4EGrhT02iF97D0j8QZ/BBLdDIG'; // Equal to 'foobar123'

export const userMock: User = {
  id: 1,
  username: 'leorcvargas',
  password: passwordHash,
  email: 'leorcvargas@dev.com',
  links: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const usersMock: User[] = [
  {
    id: 2,
    username: 'leorcvargas',
    password: passwordHash,
    email: 'leorcvargas@dev.com',
    links: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 3,
    username: 'amazinguser',
    password: passwordHash,
    email: 'amazinguser@dev.com',
    links: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 4,
    username: 'deleteduser',
    password: passwordHash,
    email: 'deleted_users@dev.com',
    links: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

export const findUserServiceMock = {
  findOneByUsername: jest.fn().mockResolvedValue(userMock),
  findOne: jest.fn().mockResolvedValue(userMock),
};

export const createUserServiceMock = {
  create: jest.fn().mockImplementation((args) =>
    Promise.resolve({
      ...userMock,
      ...args,
    }),
  ),
};

export const userRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(userMock),
  save: jest.fn().mockImplementation((args) =>
    Promise.resolve({
      ...userMock,
      ...args,
    }),
  ),
  create: jest.fn().mockImplementation((args) => ({ ...userMock, ...args })),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnValue(null),
  })),
};
