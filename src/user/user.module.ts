import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { CreateUserService } from './create-user.service';
import { FindUserService } from './find-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [FindUserService, UserResolver, CreateUserService],
  exports: [FindUserService, CreateUserService],
})
export class UserModule {}
