import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

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
      this.logger.warn(
        'Tried to sign up with an email or username already in use.',
      );
      throw new ConflictException('Email or username already in use.');
    }

    const user = this.userRepository.create({
      email,
      username,
      password,
    });
    await this.userRepository.save(user);

    return user;
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
