import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserLinkKind } from './user-link-kind.entity';
import { UserLinkKindResolver } from './user-link-kind.resolver';
import { FindUserLinkKindService } from './find-user-link-kind.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserLinkKind])],
  providers: [UserLinkKindResolver, FindUserLinkKindService],
  exports: [FindUserLinkKindService],
})
export class UserLinkKindModule {}
