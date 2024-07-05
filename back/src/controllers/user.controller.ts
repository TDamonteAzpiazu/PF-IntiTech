/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteUserSwagger, GetAllUsersSwagger, GetUserByIdSwagger, NotificationSwagger, UpdateUserSwagger } from 'src/decorators/users.decorator';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @GetAllUsersSwagger()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<User[]> {
    return await this.userService.getAllusers(page, limit);
  }

  @Get(':id')
  @GetUserByIdSwagger()
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Put(':id')
  @UpdateUserSwagger()
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: Partial<CreateUserDto>,
  ) {
    return await this.userService.updateUser(id, data);
  }

  @Put('suscriptUser/:id')
  async suscriptUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.suscriptUser(id);
  }

  @Delete(':id')
  @DeleteUserSwagger()
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.userService.deleteUser(id);
  }
}
