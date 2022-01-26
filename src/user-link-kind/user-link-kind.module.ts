import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserLinkKind } from './user-link-kind.entity';
import { UserLinkKindResolver } from './user-link-kind.resolver';
import { UserLinkKindService } from './user-link-kind.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserLinkKind])],
  providers: [UserLinkKindResolver, UserLinkKindService],
  exports: [UserLinkKindService],
})
export class UserLinkKindModule {}
