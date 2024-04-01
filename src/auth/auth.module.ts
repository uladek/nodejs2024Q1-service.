import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AuthJWTGuard } from './jwt-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthJWTGuard,
    },
  ],
  // providers: [AuthService, JwtService, LocalStrategy, JwtStrategy],

  imports: [
    UsersModule,
    PassportModule,
    {
      ...JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
      }),
      global: true,
    },

    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get('JWT_SECRET_KEY'),
    //     signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
})
export class AuthModule {}
