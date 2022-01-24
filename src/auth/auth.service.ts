/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

    const validPassword = await this.comparePassword(password, user.password);

    if (validPassword) {
      const { password: removedPassword, ...result } = user;

      return result;
    }

    return null;
  }

  async comparePassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
}
