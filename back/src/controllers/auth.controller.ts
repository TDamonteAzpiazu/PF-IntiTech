import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { Repository } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { CredentialsDto } from 'src/dto/credentials.dto';

dotenvConfig({ path: '.env' });

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async registerEmailAndPassword(@Body() body: CreateUserDto): Promise<any> {
    return await this.authService.registerEmailAndPassword(body);
  }

  @Post('login')
  async login(@Body() body: CredentialsDto): Promise<any> {
    return await this.authService.login(body);
  }

  @Get('googleLogin')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req, @Res() res) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = await this.authService.googleLogin(req);
    const jwt = await this.authService.createToken(user);
    res.redirect(`${process.env.URL}?token=${jwt}`);
  }
}
