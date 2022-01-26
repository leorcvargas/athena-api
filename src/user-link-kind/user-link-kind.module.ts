import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserLinkKind } from './user-link-kind.entity';
import { UserLinkKindResolver } from './user-link-kind.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserLinkKind])],
  providers: [UserLinkKindResolver],
})
export class UserLinkKindModule {}
