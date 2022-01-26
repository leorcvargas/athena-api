import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserLinkKind, UserLinkKindEnum } from './user-link-kind.entity';

@Injectable()
export class UserLinkKindService {
  constructor(
    @InjectRepository(UserLinkKind)
    private readonly userLinkKindRepository: Repository<UserLinkKind>,
  ) {}

  public findOne(id: string) {
    return this.userLinkKindRepository.findOne(id);
  }

  public findOneByKind(kind: UserLinkKindEnum) {
    return this.userLinkKindRepository.findOne({
      where: { value: kind },
    });
  }
}
