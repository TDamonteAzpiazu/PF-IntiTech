import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { config as dotenvConfig } from 'dotenv';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { CredentialsDto } from 'src/dto/credentials.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  LoginSwagger,
  RegisterSwagger,
  googleCallbackSwagger,
  googleLoginSwagger,
} from 'src/decorators/auth.decorator';
import { UserService } from 'src/services/user.service';

dotenvConfig({ path: '.env' });

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @RegisterSwagger()
  async registerEmailAndPassword(@Body() body: CreateUserDto): Promise<any> {
    return await this.authService.registerEmailAndPassword(body);
  }

  @Post('login')
  @LoginSwagger()
  async login(@Body() body: CredentialsDto): Promise<any> {
    return await this.authService.login(body);
  }

  @Get('googleLogin')
  @googleLoginSwagger()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req, @Res() res) {}

  @Get('google/callback')
  @googleCallbackSwagger()
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    await this.authService.googleLogin(req.user);
    const user = await this.userService.findByEmail(req.user.email);
    const jwt = await this.authService.createToken(user);
    res.status(HttpStatus.OK).redirect(`http://localhost:3001/auth/google?token=${jwt}`);
    return;
  }
}
