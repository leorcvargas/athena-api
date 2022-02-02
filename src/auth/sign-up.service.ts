import { Injectable } from '@nestjs/common';

import { CreateUserService } from '../user/create-user.service';
import { HashService } from './hash.service';

@Injectable()
export class SignUpService {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly hashService: HashService,
  ) {}

  async signUp(email: string, username: string, password: string) {
    const hash = await this.hashService.hash(password);

    return this.createUserService.create(email, username, hash);
  }
}
