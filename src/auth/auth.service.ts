/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto) {
    const { email, username, password } = body;

    const hash = await this.hashPassword(password);

    return this.userService.create(email, username, hash);
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

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
