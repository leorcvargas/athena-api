import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { UserLinkKindModule } from '../user-link-kind/user-link-kind.module';
import { UserLink } from './user-link.entity';
import { UserLinkResolver } from './user-link.resolver';
import { UserLinkService } from './user-link.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLink]),
    UserLinkKindModule,
    UserModule,
  ],
  providers: [UserLinkService, UserLinkResolver],
})
export class UserLinkModule {}
