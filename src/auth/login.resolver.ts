import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { LoginInput } from './dto/login.input';
import { LoginPayload } from './dto/login.payload';
import { LoginService } from './login.service';

@Resolver()
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Mutation((_returns) => LoginPayload)
  async login(@Args('input') input: LoginInput) {
    const { username, password } = input;

    return this.loginService.login(username, password);
  }
}
