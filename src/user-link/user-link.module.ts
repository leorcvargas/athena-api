import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserLink } from './user-link.entity';
import { UserLinkResolver } from './user-link.resolver';
import { UserLinkService } from './user-link.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserLink])],
  providers: [UserLinkService, UserLinkResolver],
})
export class UserLinkModule {}
