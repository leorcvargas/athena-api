import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class FindUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(options: FindOneOptions<User>) {
    const user = await this.userRepository.findOne(options);
    return user;
  }

  async findPublicProfile(username: string) {
    const user = await this.userRepository.findOne({
      where: (qb) => {
        qb.where('links.display = :display', { display: true });
        qb.andWhere('username = :username', { username });
        qb.orderBy('links.position', 'ASC');
      },
      join: { alias: 'user', innerJoinAndSelect: { links: 'user.links' } },
      relations: ['links'],
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneByEmailOrUsername(email: string, username: string) {
    const result = await this.userRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .orWhere('username = :username', { username })
      .getOne();

    return result;
  }
}
