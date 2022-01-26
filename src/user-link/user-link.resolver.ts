import { Query, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { UserLink } from './user-link.entity';

@Resolver((of) => UserLink)
export class UserLinkResolver {
  @Query((returns) => UserLink)
  async userLink() {
    return {};
  }

  @ResolveField()
  async type(@Parent() userLink: UserLink) {
    return {};
  }
}
