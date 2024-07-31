import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRequestDto } from 'src/user/dtos/user.request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  private async createUser(@Body() userRequestDto: UserRequestDto) {
    return this.authService.createUser(userRequestDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  private async loginUser(@Body() userRequestDto: UserRequestDto) {
    return this.authService.login(userRequestDto);
  }
}
