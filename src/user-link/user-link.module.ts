import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { UserLinkKindModule } from '../user-link-kind/user-link-kind.module';
import { UserLink } from './user-link.entity';
import { UserLinkResolver } from './user-link.resolver';
import { CreateUserLinkService } from './create-user-link.service';
import { FindUserLinkService } from './find-user-link.service';
import { DeleteUserLinkService } from './delete-user-link.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLink]),
    UserLinkKindModule,
    UserModule,
  ],
  providers: [
    UserLinkResolver,
    CreateUserLinkService,
    FindUserLinkService,
    DeleteUserLinkService,
  ],
})
export class UserLinkModule {}
