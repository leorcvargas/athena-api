import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserLinkKindEnum } from '../user-link-kind/user-link-kind.entity';
import { FindUserLinkKindService } from '../user-link-kind/find-user-link-kind.service';
import { UserLink } from './user-link.entity';

@Injectable()
export class CreateUserLinkService {
  constructor(
    @InjectRepository(UserLink)
    private readonly userLinkRepository: Repository<UserLink>,
    private readonly findUserLinkKindService: FindUserLinkKindService,
  ) {}

  public async create(
    payload: Partial<{
      url: string;
      user: number;
      kind: UserLinkKindEnum;
    }>,
  ) {
    const kind = await this.findUserLinkKindService.findOneByKind(payload.kind);
    const userLink = this.userLinkRepository.create({
      ...payload,
      user: { id: payload.user },
      kind,
    });

    return this.userLinkRepository.save(userLink);
  }
}
