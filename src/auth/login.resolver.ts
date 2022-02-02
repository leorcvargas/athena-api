import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { CookieOptions, Request, Response } from 'express';
import { ResponsePayload } from 'src/lib/gql/response.payload';

import { LoginInput } from './dto/login.input';
import { LoginPayload } from './dto/login.payload';
import { GqlAuthGuard } from './guards/graphql-auth.guard';
import { LoginService } from './login.service';

@Resolver()
export class LoginResolver {
  constructor(
    private readonly loginService: LoginService,
    private readonly configService: ConfigService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Mutation((_returns) => LoginPayload)
  async login(
    @Context() context: { req: Request; res: Response },
    @Args('input') input: LoginInput,
  ) {
    const { username, password } = input;

    const { user, accessToken } = await this.loginService.login(
      username,
      password,
    );

    const cookie = this.buildAuthCookie(accessToken);
    context.res.cookie(cookie.name, cookie.value, cookie.options);

    return { user, accessToken };
  }

  @Mutation((_returns) => ResponsePayload)
  @UseGuards(GqlAuthGuard)
  async logout(@Context() context: { req: Request; res: Response }) {
    const cookie = this.buildLogoutAuthCookie();
    context.res.cookie(cookie.name, cookie.value, cookie.options);

    const response = new ResponsePayload();
    response.success = true;

    return response;
  }

  private buildLogoutAuthCookie() {
    const name = this.configService.get<string>('app.authCookie');
    const value = '';
    const options: CookieOptions = {};

    return { name, value, options };
  }

  private buildAuthCookie(accessToken: string) {
    const name = this.configService.get<string>('app.authCookie');
    const value = accessToken;
    const options: CookieOptions = {
      domain: this.configService.get<string>('domain'),
      maxAge: 7 * 24 * 3600000, // 7 days,
    };

    return { name, value, options };
  }
}
