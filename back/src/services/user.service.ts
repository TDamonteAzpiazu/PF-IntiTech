/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository) { }

  async getAllusers(page: number, limit: number): Promise<User[]> {
    return await this.userRepository.getAllUsers(page, limit);
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.getUserById(id);
  }

  async updateUser(id: string, data: Partial<CreateUserDto>): Promise<User> {
    return await this.userRepository.updateUser(id, data);
  }


  async suscriptUser(id: string): Promise<User> {
    return await this.userRepository.suscriptUser(id);
  }

  async unsuscriptUser(id: string): Promise<User> {
    return await this.userRepository.unsuscriptUser(id);
  }

  async deleteUser(id: string): Promise<string> {
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }


}
