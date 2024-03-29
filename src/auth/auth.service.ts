import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RefreshDto, SignupDto } from './dto/create-auth.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    return await this.usersService.create(signupDto);
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken?: string }> {
    const user = await this.usersService.findByLogin(loginDto);

    if (!user) {
      throw new HttpException(
        'Invalid login credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    //  JWTтокены для пользователя ??
    const payload = { userId: user.id, login: user.login };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '1h' }),
      this.jwtService.signAsync(payload, { expiresIn: '24h' }),
    ]);

    return { accessToken, refreshToken };
  }

  async refresh(refreshDto: RefreshDto): Promise<{ accessToken: string }> {
    try {
      const decodedToken = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
      );
      const userId = decodedToken.userId;
      const payload = { userId };
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      });
      return { accessToken };
    } catch (error) {
      throw new HttpException(
        'Invalid or expired refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
