import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { AuthRepository } from 'src/repositories/auth.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';
import { GoogleStrategy } from 'src/google.strategy/google.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    UserRepository,
    JwtService,
    UserService,
    GoogleStrategy,
  ],
})
export class AuthModule {}
