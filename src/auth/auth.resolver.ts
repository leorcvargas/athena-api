import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';

import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginPayload } from './dto/login.payload';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => LoginPayload)
  async login(@Args('input') input: LoginInput) {
    const { username, password } = input;

    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UserInputError('Username or password incorrect.');
    }

    const { accessToken } = await this.authService.login(user);

    const payload = new LoginPayload();
    payload.accessToken = accessToken;
    payload.user = user;

    return payload;
  }
}
