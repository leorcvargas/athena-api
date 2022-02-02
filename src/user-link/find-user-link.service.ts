import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { UserLink } from './user-link.entity';

@Injectable()
export class FindUserLinkService {
  constructor(
    @InjectRepository(UserLink)
    private readonly userLinkRepository: Repository<UserLink>,
  ) {}

  public findOne(options: FindOneOptions<UserLink>) {
    return this.userLinkRepository.findOne(options);
  }

  public findByUser(userId: number) {
    return this.userLinkRepository.find({
      where: { user: userId, deletedAt: null },
      order: { position: 'ASC' },
      loadRelationIds: true,
    });
  }
}
