import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository, UpdateResult } from 'typeorm';

import { UserLink } from './user-link.entity';

@Injectable()
export class DeleteUserLinkService {
  constructor(
    @InjectRepository(UserLink)
    private readonly userLinkRepository: Repository<UserLink>,
  ) {}

  public delete(userId: string, id: string): Promise<UpdateResult> {
    const conditions: FindConditions<UserLink> = { id, user: userId };

    return this.userLinkRepository.softDelete(conditions);
  }
}
