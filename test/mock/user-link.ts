import { userMock } from './user';
import { UserLink } from '../../src/user-link/user-link.entity';
import { userLinkKindMock } from './user-link-kind';

export const userLinkMock: UserLink = {
  id: 'abc',
  kind: userLinkKindMock.id,
  url: 'https://github.com/leorcvargas',
  user: userMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const userLinksMock: UserLink[] = [
  { ...userLinkMock },
  {
    id: 'def',
    kind: userLinkKindMock.id,
    url: 'https://instagram.com/leorcvargas',
    user: userMock.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 'deleted_user_link',
    kind: userLinkKindMock.id,
    url: 'https://instagram.com/dkpewermlwqkr',
    user: userMock.id,
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
};
