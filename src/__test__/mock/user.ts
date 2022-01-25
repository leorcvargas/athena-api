import { User } from '../../user/user.entity';

const passwordHash =
  '$2b$10$303EieujEmpxn1QyR6qCpuGluX/PxM6.OmQRRM2MChUvbX.mjsEv6'; // Equal to 'foobar'

export const userMock: User = {
  id: 'abc',
  username: 'leorcvargas',
  password: passwordHash,
  email: 'leorcvargas@dev.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const usersMock: User[] = [
  {
    id: 'abc',
    username: 'leorcvargas',
    password: passwordHash,
    email: 'leorcvargas@dev.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 'def',
    username: 'amazinguser',
    password: passwordHash,
    email: 'amazinguser@dev.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 'ghi',
    username: 'deleteduser',
    password: passwordHash,
    email: 'deleted_users@dev.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

export const userServiceMock = {
  findOneByUsername: jest.fn().mockResolvedValue(userMock),
  findOne: jest.fn().mockResolvedValue(userMock),
  create: jest.fn().mockImplementation((args) =>
    Promise.resolve({
      ...userMock,
      ...args,
    }),
  ),
};

export const userRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(userMock),
};
