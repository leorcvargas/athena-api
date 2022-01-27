import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationError } from 'apollo-server-express';

import { ValidateUserService } from './validate-user.service';
import { LoginPayload } from './dto/login.payload';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validateUserService: ValidateUserService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.validateUserService.validate(username, password);

    if (!user) {
      throw new AuthenticationError('Username or password incorrect.');
    }

    const { id, email } = user;
    const jwtPayload = { username, email, sub: id };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    const payload = new LoginPayload();
    payload.accessToken = accessToken;
    payload.user = user;

    return payload;
  }
}
