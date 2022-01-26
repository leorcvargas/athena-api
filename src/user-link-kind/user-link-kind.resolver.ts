import { Resolver } from '@nestjs/graphql';

import { UserLinkKind } from './user-link-kind.entity';

@Resolver((of) => UserLinkKind)
export class UserLinkKindResolver {}
