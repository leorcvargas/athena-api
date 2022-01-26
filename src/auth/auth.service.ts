/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(email: string, username: string, password: string) {
    const hash = await this.hashPassword(password);

    return this.userService.create(email, username, hash);
  }

  async login(user: User) {
    const { id, email, username } = user;
    const payload = { username, email, sub: id };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validPassword = await this.comparePassword(password, user.password);

    if (validPassword) {
      const { password: removedPassword, ...result } = user;

      return result;
    }

    return null;
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  private async comparePassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
}
