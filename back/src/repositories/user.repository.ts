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
import { transporter } from 'src/config/mailer';

@Injectable()
export class UserRepository implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly cartRepository: CartRepository,
  ) { }

  async onModuleInit() {
    const user = await this.userRepository.findOne({
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
      const cart = await this.cartRepository.createCart(newUser);
      newUser.cart = cart;
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
    const user = await this.userRepository.findOne({ where: { id }, relations: { cart: true } });
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

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const updatedUser = this.userRepository.merge(user, data);
      return await this.userRepository.save(updatedUser);
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

  async getNotifications(user: User) {
    await transporter.sendMail({
      from: '"Test 👻" <pablorodriguez6002@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Gracias por subscribirte a las novedades!', // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #FFA500;">¡Gracias por suscribirte a nuestras notificaciones, <span style="color: #FFD700;">${user.name}</span>!</h2>
          <p>Estamos encantados de que hayas decidido mantenerte al día con nosotros. Aquí podrás estar al tanto de:</p>
          <ul>
            <li>Novedades y actualizaciones en nuestra página.</li>
            <li>Información sobre nuevos productos.</li>
            <li>Implementaciones y mejoras en nuestros servicios.</li>
            <li>Un resumen de la generación y ahorro de energía y agua.</li>
          </ul>
          <p>Para más información, haz clic en el siguiente botón:</p>
          <a href="${process.env.URL}" style="text-decoration: none;">
            <button style="background: linear-gradient(90deg, #FFD700, #FFA500); color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
              Ver Novedades
            </button>
          </a>
          <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo.</p>
          <p>¡Gracias!</p>
          <p>El equipo de Intitech 🧡</p>
        </div>
        <style>
          a:hover button {
            cursor: pointer;
          }
        </style>
      `, // html body
    });
  }
}
