import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  Mutation,
  Args,
} from '@nestjs/graphql';

import { UserLinkKindService } from '../user-link-kind/user-link-kind.service';
import { CurrentUser } from '../auth/decorators/current-user-gql.decorator';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { UserLinkInput } from './dto/user-link.input';
import { UserLink } from './user-link.entity';
import { UserLinkService } from './user-link.service';
import { UserService } from '../user/user.service';

@Resolver((_of) => UserLink)
export class UserLinkResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userLinkService: UserLinkService,
    private readonly userLinkKindService: UserLinkKindService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((_returns) => UserLink)
  async createUserLink(
    @CurrentUser() user,
    @Args('input') input: UserLinkInput,
  ) {
    return this.userLinkService.create({ ...input, user: user.id });
  }

  @UseGuards(GqlAuthGuard)
  @Query((_returns) => [UserLink])
  async userLinks(@CurrentUser() user) {
    return this.userLinkService.findByUser(user.id);
  }

  @ResolveField()
  async kind(@Parent() userLink: UserLink) {
    return this.userLinkKindService.findOne(userLink.kind as string);
  }

  @ResolveField()
  async user(@Parent() userLink: UserLink) {
    return this.userService.findOne(userLink.user as string);
  }
}
