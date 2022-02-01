import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserLink } from './user-link.entity';

@Injectable()
export class FindUserLinkService {
  constructor(
    @InjectRepository(UserLink)
    private readonly userLinkRepository: Repository<UserLink>,
  ) {}

  public findByUser(userId: string) {
    return this.userLinkRepository.find({
      where: { user: userId, deletedAt: null },
      loadRelationIds: true,
    });
  }

  public findOneFromUser(userId: number, id: number) {
    return this.userLinkRepository.findOne({
      where: { id, user: userId },
      loadRelationIds: true,
    });
  }
}
