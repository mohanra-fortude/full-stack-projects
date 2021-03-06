import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(login: { email: string; password: string }) {
    console.log(login);

    const user = await this.authService.validateUser(login);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
