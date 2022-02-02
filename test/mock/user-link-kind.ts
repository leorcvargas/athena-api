import { UserLinkKindEnum } from '../../src/user-link-kind/user-link-kind.entity';
import { UserLinkKind } from '../../src/user-link-kind/user-link-kind.entity';

export const userLinkKindMock: UserLinkKind = {
  id: 1,
  value: UserLinkKindEnum.BASIC,
};

export const userLinkKindsMock: UserLinkKind[] = [{ ...userLinkKindMock }];

export const userLinkKindRepositoryMock = {
  findOne: jest.fn((args) => {
    if (args?.where?.kind) {
      const result = userLinkKindsMock.find(
        (kind) => kind.value === args?.where?.kind,
      );
      return Promise.resolve(result);
    }

    return Promise.resolve(userLinkKindMock);
  }),
  find: jest.fn().mockResolvedValue(Promise.resolve(userLinkKindsMock)),
};
