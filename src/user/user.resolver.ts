import { Query, Resolver } from '@nestjs/graphql';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FindUserService } from './find-user.service';
import { User } from './user.entity';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user-gql.decorator';

@Resolver((_of) => User)
export class UserResolver {
  constructor(private findUserService: FindUserService) {}

  @Query((_returns) => User)
  @UseGuards(GqlAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async profile(@CurrentUser() user: User) {
    const result = await this.findUserService.findOne(user.id);

    return result;
  }
}
