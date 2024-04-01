import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { LoginDto, RefreshDto, SignupDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { Public } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup(signupDto);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto) {
    const { login, password } = loginDto;
    return this.authService.login(login, password);
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refresh(refreshDto);
  }
}
