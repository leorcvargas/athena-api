import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class FindUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneByEmailOrUsername(email: string, username: string) {
    return this.userRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .orWhere('username = :username', { username })
      .getOne();
  }
}
