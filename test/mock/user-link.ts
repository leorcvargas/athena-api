import { userMock } from './user';
import { UserLink } from '../../src/user-link/user-link.entity';
import { userLinkKindMock } from './user-link-kind';
import { UpdateResult } from 'typeorm';

export const userLinkMock: UserLink = {
  id: 1,
  kind: userLinkKindMock.id,
  title: 'GitHub',
  url: 'https://github.com/leorcvargas',
  user: userMock.id,
  display: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const userLinksMock: UserLink[] = [
  { ...userLinkMock },
  {
    id: 2,
    kind: userLinkKindMock.id,
    title: 'Instagram',
    url: 'https://instagram.com/leorcvargas',
    user: userMock.id,
    display: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 3,
    kind: userLinkKindMock.id,
    title: 'Deleted Instagram',
    url: 'https://instagram.com/dkpewermlwqkr',
    user: userMock.id,
    display: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];

export const findUserLinkServiceMock = {
  findByUser: jest.fn().mockResolvedValue(userLinksMock),
};

export const createUserLinkServiceMock = {
  create: jest.fn().mockImplementation((args) =>
    Promise.resolve({
      ...userLinkMock,
      ...args,
    }),
  ),
};

export const userLinkRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(userLinkMock),
  find: jest.fn(async (args) => {
    return userLinksMock.filter((userLink) => {
      if (args.where.deletedAt === null) {
        return userLink.deletedAt === null;
      }

      return true;
    });
  }),
  save: jest.fn().mockImplementation((args) =>
    Promise.resolve({
      ...userLinkMock,
      ...args,
    }),
  ),
  create: jest.fn().mockImplementation((args) => ({ ...userMock, ...args })),
  softDelete: jest.fn().mockResolvedValue(
    Promise.resolve<UpdateResult>({
      generatedMaps: [],
      raw: '',
      affected: 1,
    }),
  ),
};
