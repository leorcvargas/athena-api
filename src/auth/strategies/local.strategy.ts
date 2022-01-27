import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserService } from '../validate-user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserService: ValidateUserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.validateUserService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
