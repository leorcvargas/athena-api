import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { HashService } from './hash.service';

@Injectable()
export class SignUpService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async signUp(email: string, username: string, password: string) {
    const hash = await this.hashService.hash(password);

    return this.userService.create(email, username, hash);
  }
}
