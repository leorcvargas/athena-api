import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserLinkKindEnum } from '../user-link-kind/user-link-kind.entity';
import { UserLinkKindService } from '../user-link-kind/user-link-kind.service';
import { UserLink } from './user-link.entity';

@Injectable()
export class UserLinkService {
  private readonly logger = new Logger(UserLinkService.name);

  constructor(
    @InjectRepository(UserLink)
    private readonly userLinkRepository: Repository<UserLink>,
    private readonly userLinkKindService: UserLinkKindService,
  ) {}

  public findByUser(userId: string) {
    return this.userLinkRepository.find({
      where: { user: userId },
    });
  }

  public async create(payload: {
    url: string;
    user: string;
    kind: UserLinkKindEnum;
  }) {
    const kind = await this.userLinkKindService.findOneByKind(payload.kind);
    const userLink = this.userLinkRepository.create({
      ...payload,
      kind,
    });

    return this.userLinkRepository.save(userLink);
  }
}
