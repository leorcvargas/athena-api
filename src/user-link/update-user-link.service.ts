import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLinkInput } from './dto/user-link.input';

import { FindUserLinkKindService } from '../user-link-kind/find-user-link-kind.service';
import { FindUserLinkService } from './find-user-link.service';
import { UserLink } from './user-link.entity';

@Injectable()
export class UpdateUserLinkService {
  constructor(
    private readonly findUserLinkService: FindUserLinkService,
    private readonly findUserLinkKindService: FindUserLinkKindService,
    @InjectRepository(UserLink)
    private readonly userLinkRepository: Repository<UserLink>,
  ) {}

  public async update(userId: number, id: number, payload: UserLinkInput) {
    const userLink = await this.findUserLinkService.findOneFromUser(userId, id);

    if (!userLink) {
      throw new NotFoundException();
    }

    const kind = await this.findUserLinkKindService.findOneByKind(payload.kind);

    return this.userLinkRepository.save({
      ...userLink,
      ...payload,
      kind,
    });
  }
}
