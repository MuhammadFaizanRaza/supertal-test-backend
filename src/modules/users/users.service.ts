import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectConfig } from '../../common/decorators/inject-config.decorator';
import { JWTConfig, JWTConfigType } from 'src/core/jwt/jwt.config';
import { ResponseDto } from '../../common/dto/base-response';
import { UsersEntity } from './entities/users.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectConfig(JWTConfig)
    private readonly JWTConfigFactory: JWTConfigType,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  getToken(user): string {
    return this.jwtService.sign({ ...user });
  }

  async register(registerDto: RegisterDto): Promise<ResponseDto> {
    try {
      const userEntity = this.usersRepository.create(registerDto);
      const user = await this.usersRepository.save(userEntity);
      const userData = user.userSanitize();

      return {
        message: 'User Signup Successfully',
        data: { user: userData, token: this.getToken(userData) },
      };
    } catch (error) {
      if (error.code == '23505') {
        if (error.detail.includes('email')) {
          throw new ConflictException('Email already exists');
        } else {
          throw new ConflictException('Mobile number already exists');
        }
      } else {
        throw error;
      }
    }
  }

  async login(loginDto: LoginDto): Promise<ResponseDto<{ user: UsersEntity; token: string }>> {
    try {
      const { email, password } = loginDto;
      const user = await this.usersRepository.findOne({ email });

      if (!user || !user.validatePassword(password)) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const userData = user.userSanitize();

      return {
        message: 'Successfully Signin',
        data: { user: userData, token: this.getToken(userData) },
      };
    } catch (error) {
      throw error;
    }
  }
}
