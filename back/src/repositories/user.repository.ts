/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enum/role.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Cart } from 'src/entities/cart.entity';
import { CartRepository } from './cart.repository';

@Injectable()
export class UserRepository implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly cartRepository: CartRepository,
  ) {}

  async onModuleInit() {
    const user = await this.userRepository.findOne({
      where: { email: 'admin@example.com' },
    });
    if (!user) {
      const cart= await this.cartRepository.createCart();
      const hashedPassword = await bcrypt.hash('Password1!', 10);
      const newUser = this.userRepository.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        address: 'Calle Falsa 123',
        phone: '123456789',
        role: Role.Admin,
        status: 'active',
        cart: cart,
        
      });

      await this.userRepository.save(newUser);
    }
  }

  async getAllUsers(page: number, limit: number): Promise<User[]> {
    const [users] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!users.length) {
      throw new NotFoundException(
        'Users not found, please create at least one',
      );
    }

    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: Partial<CreateUserDto>): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = this.userRepository.merge(user, data);
    return await this.userRepository.save(updatedUser);
  }

  async delete(id: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
    return 'User deleted';
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      ...data,
    });
    return await this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
}
