import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpDto, @Res() res: Response) {
    await this.authService.signUp(body);

    res.status(HttpStatus.CREATED).send();
  }
}
