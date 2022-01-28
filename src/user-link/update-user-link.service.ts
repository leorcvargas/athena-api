import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FindUserLinkService } from './find-user-link.service';
import { UserLink } from './user-link.entity';

@Injectable()
export class UpdateUserLinkService {
  constructor(
    private readonly findUserLinkService: FindUserLinkService,
    @InjectRepository(UserLink)
    private readonly userLinkRepository: Repository<UserLink>,
  ) {}

  public async update(userId: string, id: string, payload: Partial<UserLink>) {
    const userLink = await this.findUserLinkService.findOneFromUser(userId, id);

    if (!userLink) {
      throw new NotFoundException();
    }

    return this.userLinkRepository.save({
      ...userLink,
      ...payload,
    });
  }
}
