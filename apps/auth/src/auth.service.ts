import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from './user/schemas/user.schema';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

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

  async login(user: User): Promise<{ access_token: string }> {
    const payload = {
      email: user.email,
      sub: user._id,
    };

    const access_token = await this.jwtService.sign(payload);

    return {
      access_token,
    };
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
}
