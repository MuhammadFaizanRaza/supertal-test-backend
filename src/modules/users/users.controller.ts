import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../common/dto/base-response';
import { UsersEntity } from './entities/users.entity';
import { BypassAuth } from './decorators/bypass.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @BypassAuth()
  register(@Body() registerDto: RegisterDto): Promise<ResponseDto> {
    return this.usersService.register(registerDto);
  }

  @Post('/login')
  @BypassAuth()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto): Promise<ResponseDto<{ user: UsersEntity; token: string }>> {
    return this.usersService.login(loginDto);
  }
}
