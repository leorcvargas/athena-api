import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FindUserService } from './find-user.service';
import { User } from './user.entity';

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);

  constructor(
    private readonly findUserService: FindUserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(email: string, username: string, password: string) {
    const userAlreadyExists =
      await this.findUserService.findOneByEmailOrUsername(email, username);

    if (userAlreadyExists) {
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
}
