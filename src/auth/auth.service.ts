import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RefreshDto, SignupDto } from './dto/create-auth.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const { password, ...userData } = signupDto;

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    return newUser;
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
    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid login credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { id: user.id, login: user.login };
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

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByLogin(login);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
