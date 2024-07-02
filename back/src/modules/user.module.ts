/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { Cart } from 'src/entities/cart.entity';
import { User } from 'src/entities/user.entity';
import { CartRepository } from 'src/repositories/cart.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository,CartRepository],
})
export class UserModule {}
