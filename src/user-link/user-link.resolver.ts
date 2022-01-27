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
import { CreateUserLinkService } from './create-user-link.service';
import { FindUserLinkService } from './find-user-link.service';
import { FindUserService } from '../user/find-user.service';

@Resolver((_of) => UserLink)
export class UserLinkResolver {
  constructor(
    private readonly findUserService: FindUserService,
    private readonly createUserLinkService: CreateUserLinkService,
    private readonly findUserLinkService: FindUserLinkService,
    private readonly userLinkKindService: UserLinkKindService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((_returns) => UserLink)
  async createUserLink(
    @CurrentUser() user,
    @Args('input') input: UserLinkInput,
  ) {
    return this.createUserLinkService.create({ ...input, user: user.id });
  }

  @UseGuards(GqlAuthGuard)
  @Query((_returns) => [UserLink])
  async userLinks(@CurrentUser() user) {
    return this.findUserLinkService.findByUser(user.id);
  }

  @ResolveField()
  async kind(@Parent() userLink: UserLink) {
    return this.userLinkKindService.findOne(userLink.kind as string);
  }

  @ResolveField()
  async user(@Parent() userLink: UserLink) {
    return this.findUserService.findOne(userLink.user as string);
  }
}
