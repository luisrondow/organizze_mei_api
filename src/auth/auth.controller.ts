import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    console.log(createUserDto);
    await this.authService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentiaslsDto);
  }

  @Get('/me')
  // @UseGuards(AuthGuard())
  async getMe(@Req() req): Promise<{ user: User }> {
    const token = req.headers.authorization.split(' ')[1];

    const user = await this.authService.getMe(token);

    return { user };
  }
}
