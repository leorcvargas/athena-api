import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FindUserService } from './find-user.service';
import { User } from './user.entity';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user-gql.decorator';
import { PublicProfilePayload } from './dto/public-profile.payload';

@Resolver((_of) => User)
export class UserResolver {
  constructor(private findUserService: FindUserService) {}

  @Query((_returns) => PublicProfilePayload)
  async publicProfile(@Args('username') username: string) {
    const user = await this.findUserService.findPublicProfile(username);

    const payload = new PublicProfilePayload();
    payload.id = user.id;
    payload.username = user.username;
    payload.links = await user.links;

    return payload;
  }

  @Query((_returns) => User)
  @UseGuards(GqlAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async profile(@CurrentUser() user: User) {
    const result = await this.findUserService.findOne({
      where: { id: user.id },
    });

    return result;
  }
}
