import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from './user/schemas/user.schema';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User> | null {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found with this email');
    }

    const passwordValid = await bcryptjs.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: User, response: Response) {
    const payload = {
      userId: user._id,
    };

    const token = await this.jwtService.sign(payload);
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION') || 36000,
    );

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return user;
  }

  async verify(token: string): Promise<User> {
    const secret = this.configService.get('JWT_SECRET');
    const decoded = await this.jwtService.verify(token, {
      secret,
    });
    const user = await this.userService.findByEmail(decoded.email);

    if (!user) {
      throw new UnauthorizedException('Unable to get the user from token');
    }

    return user;
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
