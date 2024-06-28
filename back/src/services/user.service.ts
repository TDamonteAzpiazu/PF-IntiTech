/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllusers(page: number, limit: number) {
    return await this.userRepository.getAllUsers(page, limit);
  }

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async updateUser(id: string, data: Partial<CreateUserDto>) {
    return await this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
