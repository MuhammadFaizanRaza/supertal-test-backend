import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectConfig } from '../../../common/decorators/inject-config.decorator';
import { JWTConfig } from '../../../core/jwt/jwt.config';
import { UsersEntity } from '../entities/users.entity';
import { UsersRepository } from '../..//users/repositories/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectConfig(JWTConfig) private readonly JWTConfigFactory: ConfigType<typeof JWTConfig>,
    @InjectRepository(UsersRepository)
    private readonly UsersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExipration: false,
      secretOrKey: JWTConfigFactory.jwtSecret,
    });
  }

  async validate(payload: any): Promise<UsersEntity> {
    const { email } = payload;
    const user = await this.UsersRepository.getUser(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
