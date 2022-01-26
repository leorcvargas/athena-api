import { Query, Resolver } from '@nestjs/graphql';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.entity';
import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user-gql.decorator';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async profile(@CurrentUser() user: User) {
    const result = await this.userService.findOne(user.id);

    return result;
  }
}
