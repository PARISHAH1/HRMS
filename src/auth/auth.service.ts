import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { decrypt } from '../utils/encryption';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {
  private readonly SECRET_KEY = 'Vraj123';
  private readonly INITIAL_VALIDATION_WINDOW = 60 * 1000; // 60 seconds for initial validation
  private readonly SESSION_DURATION = 15 * 60 * 1000; // 15 minutes for session

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (!user) {
        return null;
      }
      
      if (pass !== decrypt(user.Password)) {
        return null;
      }

      const { Password, ...result } = user;
      return result;
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    const payload = { email: user.Email, sub: user.UID, cid: user.CID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(encryptedToken: string) {
    try {
      if (!encryptedToken) {
        throw new UnauthorizedException('No authentication token provided');
      }

      // Decrypt the token
      const decrypted = CryptoJS.AES.decrypt(encryptedToken, this.SECRET_KEY);
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedString) {
        throw new UnauthorizedException('Invalid token encryption');
      }

      // Split token and timestamp
      const [jwtToken, timestamp] = decryptedString.split('_');
      if (!jwtToken || !timestamp) {
        throw new UnauthorizedException('Invalid token format');
      }

      // Check initial time difference (must be less than 60 seconds)
      const currentTime = Date.now();
      const tokenTime = parseInt(timestamp);
      const timeDiff = currentTime - tokenTime;

      console.log('Token validation:', {
        currentTime,
        tokenTime,
        timeDiff,
        isValid: timeDiff <= this.INITIAL_VALIDATION_WINDOW
      });

      // First check: Token must be less than 60 seconds old
      if (timeDiff > this.INITIAL_VALIDATION_WINDOW) {
        throw new UnauthorizedException('Token validation window expired. Please login again.');
      }

      // Second check: Verify JWT token (15-minute validity)
      const payload = this.jwtService.verify(jwtToken);
      
      return {
        statusCode: 201,
        message: 'Token validated successfully',
        user: payload,
        timestamp: currentTime,
        sessionValid: true
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid authentication token');
    }
  }
} 