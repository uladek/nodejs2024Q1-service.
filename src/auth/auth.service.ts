import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RefreshDto, SignupDto } from './dto/create-auth.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    return await this.usersService.create(signupDto);
  }

  async login(login: string, password: string) {
    const user = await this.usersService.findByLogin(login);

    if (!user) {
      throw new HttpException(
        'Invalid login credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await this.validateUser(login, password);
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid login credentials',
        HttpStatus.FORBIDDEN,
      );
    }
    const payload = { userId: user.id, login: user.login };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async refresh(
    refreshDto: RefreshDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const decodedToken = await this.jwtService.verify(
        refreshDto.refreshToken,
      );
      const userId = decodedToken.userId;
      const user = await this.usersService.findOne(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }
      const { id, login } = user;

      const payload = { userId: id, login: login };

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.sign(payload, {
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        }),
        this.jwtService.sign(payload, {
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      ]);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new HttpException(
        'Invalid or expired refresh token',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByLogin(login);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
