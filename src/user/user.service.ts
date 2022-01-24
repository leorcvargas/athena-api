import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(email: string, username: string, password: string) {
    const sameEmailUser = await this.userRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .orWhere('username = :username', { username })
      .getOne();
    if (sameEmailUser) {
      throw new BadRequestException('Email or username already in use.');
    }

    const user = this.userRepository.create({
      email,
      username,
      password,
    });
    await this.userRepository.save(user);

    return user;
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
