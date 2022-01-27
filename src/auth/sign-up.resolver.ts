import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { SignUpInput } from './dto/sign-up.input';
import { SignUpPayload } from './dto/sign-up.payload';
import { SignUpService } from './sign-up.service';

@Resolver()
export class SignUpResolver {
  constructor(private readonly signUpService: SignUpService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Mutation((_returns) => SignUpPayload)
  async signUp(@Args('input') input: SignUpInput) {
    const { email, username, password } = input;

    const user = await this.signUpService.signUp(email, username, password);
    const payload = new SignUpPayload();
    payload.user = user;

    return payload;
  }
}
