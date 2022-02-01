import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  Mutation,
  Args,
} from '@nestjs/graphql';

import { FindUserLinkKindService } from '../user-link-kind/find-user-link-kind.service';
import { CurrentUser } from '../auth/decorators/current-user-gql.decorator';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { UserLink } from './user-link.entity';
import { CreateUserLinkService } from './create-user-link.service';
import { FindUserLinkService } from './find-user-link.service';
import { FindUserService } from '../user/find-user.service';
import { DeleteUserLinkService } from './delete-user-link.service';
import { ResponsePayload } from '../lib/gql/response.payload';
import { UpdateUserLinkService } from './update-user-link.service';
import { UserLinkInput } from './dto/user-link.input';

@Resolver((_of) => UserLink)
export class UserLinkResolver {
  constructor(
    private readonly createUserLinkService: CreateUserLinkService,
    private readonly deleteUserLinkService: DeleteUserLinkService,
    private readonly findUserLinkService: FindUserLinkService,
    private readonly updateUserLinkService: UpdateUserLinkService,
    private readonly findUserService: FindUserService,
    private readonly findUserLinkKindService: FindUserLinkKindService,
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
  @Mutation((_returns) => UserLink)
  async updateUserLink(
    @CurrentUser() user,
    @Args('id') id: string,
    @Args('input') input: UserLinkInput,
  ) {
    return this.updateUserLinkService.update(user.id, id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((_returns) => ResponsePayload)
  async deleteUserLink(@CurrentUser() user, @Args('id') id: string) {
    await this.deleteUserLinkService.delete(user.id, id);

    const response = new ResponsePayload();
    response.success = true;

    return response;
  }

  @UseGuards(GqlAuthGuard)
  @Query((_returns) => [UserLink])
  async userLinks(@CurrentUser() user) {
    return this.findUserLinkService.findByUser(user.id);
  }

  @ResolveField()
  async kind(@Parent() userLink: UserLink) {
    return this.findUserLinkKindService.findOne(userLink.kind as string);
  }

  @ResolveField()
  async user(@Parent() userLink: UserLink) {
    return this.findUserService.findOne(userLink.user as string);
  }
}
