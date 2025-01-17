import {Injectable, InternalServerErrorException,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './dto/login.dto';
import * as bcrypt from 'bcrypt'; 
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/user.entities';


@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
  }
  
  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async loginUser(loginUserDto: Login): Promise<{ message: string; token: string }> {
    try {
      const user = await this.userRepository.findOne({ where: { email: loginUserDto.email } });
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }
       const scret='qawsedrftgyh'
      const token = jwt.sign({ userId: user.id, userRole: user.role }, scret, { expiresIn: '1h' });
      return {
        message: 'Login successful',
        token,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        console.log(error);
        throw new InternalServerErrorException('An error occurred while logging in the user');
      }
    }
  }

  async verifyToken(token: string): Promise<any> {
    const scret='qawsedrftgyh'
    try {
      const decoded = jwt.verify(token, scret);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}