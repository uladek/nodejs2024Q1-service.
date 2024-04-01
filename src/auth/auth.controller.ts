import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto, RefreshDto, SignupDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto) {
    await this.authService.signup(signupDto);
    return { message: 'Created  new user' };
  }

  @Post('login')
  // @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto) {
    const { login, password } = loginDto;
    return this.authService.login(login, password);
  }

  @Post('refresh')
  // @UseGuards(JwtAuthGuard)
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refresh(refreshDto);
  }
}
