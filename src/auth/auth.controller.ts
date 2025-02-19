import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  public getAuth() {
    return 'auth';
  }

  @Post()
  public signup(@Body() body: any) {
    return this.authService.signUp(body.username, body.password);
  }
}
