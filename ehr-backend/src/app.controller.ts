import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { User } from './users/user.interface';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('auth/login')
  login(@Body() body: User) {
    return this.authService.login(body);
  }
}
