/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enum/role.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CartRepository } from './cart.repository';
import { Cart } from 'src/entities/cart.entity';

@Injectable()
export class UserRepository implements OnModuleInit {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly cartRepository: CartRepository,
  ) { }

  async onModuleInit(): Promise<void> {
    const user: User = await this.userRepository.findOne({
      where: { email: 'admin@example.com' },
    });
    if (!user) {
      const hashedPassword = await bcrypt.hash('Password1!', 10);
      const newUser = this.userRepository.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        address: 'Calle Falsa 123',
        phone: '123456789',
        role: Role.Admin,
        status: 'active',
      });
      await this.userRepository.save(newUser);
      const cart: Cart = await this.cartRepository.createCart(newUser);
      newUser.cart = cart;
      await this.userRepository.save(newUser);
    }
  }

  async getAllUsers(page: number, limit: number): Promise<User[]> {
    const [users]: [User[], number] = await this.userRepository.findAndCount({
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
    const user: User = await this.userRepository.findOne({ where: { id }, relations: { cart: true } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: Partial<CreateUserDto>): Promise<User> {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }
  
    const updatedUser = this.userRepository.merge(user, data);
    await this.userRepository.save(updatedUser);
  
    // Refetch the user to include the cart relation
    const completeUser = await this.userRepository.findOne({ where: { id }, relations: { cart: true } });
    return completeUser;
  }

  async suscriptUser(id: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.subscribed = true;
    return await this.userRepository.save(user);
  }

  async unsuscriptUser(id: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.subscribed = false;
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<string> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
    return 'User deleted';
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser: User = this.userRepository.create({
      ...data,
    });
    return await this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async banUser(userId: string): Promise<string> {
    await this.userRepository.update(userId, { status: 'inactive' });
    return "user banned"
  }
  
  async unbanUser(userId: string): Promise<string> {
    await this.userRepository.update(userId, { status: 'active' });
    return "User unbanned"
  }

}
