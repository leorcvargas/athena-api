import { Injectable, NotFoundException } from '@nestjs/common';

import { FindUserService } from '../user/find-user.service';
import { HashService } from './hash.service';

@Injectable()
export class ValidateUserService {
  constructor(
    private readonly findUserService: FindUserService,
    private readonly hashService: HashService,
  ) {}

  async validate(username: string, password: string) {
    const user = await this.findUserService.findOneByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validPassword = await this.hashService.compare(
      password,
      user.password,
    );

    if (validPassword) {
      const { password: _, ...result } = user;

      return result;
    }

    return null;
  }
}
