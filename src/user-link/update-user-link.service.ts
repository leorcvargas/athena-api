import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FindUserLinkKindService } from '../user-link-kind/find-user-link-kind.service';
import { FindUserLinkService } from './find-user-link.service';
import { UserLink } from './user-link.entity';
import { UpdateUserLinkInput } from './dto/update-user-link.input';
import { UpdateUserLinkPositionInput } from './dto/update-user-link-position.input';

@Injectable()
export class UpdateUserLinkService {
  constructor(
    private readonly findUserLinkService: FindUserLinkService,
    private readonly findUserLinkKindService: FindUserLinkKindService,
    @InjectRepository(UserLink)
    private readonly userLinkRepository: Repository<UserLink>,
  ) {}

  public async update(
    userId: number,
    id: number,
    payload: UpdateUserLinkInput,
  ) {
    const userLink = await this.findUserLinkService.findOne({
      where: { id, user: userId },
      loadRelationIds: true,
    });

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

  // TODO: Improve logic
  public async updatePositions(
    userId: number,
    input: UpdateUserLinkPositionInput[],
  ) {
    const updatedPositions = await Promise.all(
      input.map((item) => this.mapNewPositions(userId, item)),
    );

    return this.userLinkRepository.save(updatedPositions);
  }

  private async mapNewPositions(
    userId: number,
    { id, position }: UpdateUserLinkPositionInput,
  ) {
    const link = await this.findUserLinkService.findOne({
      where: { id, user: userId },
    });
    link.position = position;

    return link;
  }
}
