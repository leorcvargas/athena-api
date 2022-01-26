import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';

import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginPayload } from './dto/login.payload';
import { SignUpInput } from './dto/sign-up.input';
import { SignUpPayload } from './dto/sign-up.payload';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Mutation((returns) => SignUpPayload)
  async signUp(@Args('input') input: SignUpInput) {
    const { email, username, password } = input;

    const user = await this.authService.signUp(email, username, password);
    const payload = new SignUpPayload();
    payload.user = user;

    return payload;
  }
}
