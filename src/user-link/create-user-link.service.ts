import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FindUserLinkKindService } from '../user-link-kind/find-user-link-kind.service';
import { UserLink } from './user-link.entity';
import { CreateUserLinkInput } from './dto/create-user-link.input';

@Injectable()
export class CreateUserLinkService {
  constructor(
    @InjectRepository(UserLink)
    private readonly userLinkRepository: Repository<UserLink>,
    private readonly findUserLinkKindService: FindUserLinkKindService,
  ) {}

  public async create(userId: number, payload: CreateUserLinkInput) {
    const kind = await this.findUserLinkKindService.findOneByKind(payload.kind);

    const userLink = this.userLinkRepository.create({
      ...payload,
      kind,
      user: { id: userId },
    });

    return this.userLinkRepository.save(userLink);
  }
}
