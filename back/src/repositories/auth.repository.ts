import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as cron from 'node-cron';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { Role } from 'src/enum/role.enum';
import { config as dotenvConfig } from 'dotenv';
import { CartRepository } from './cart.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { sendWeeklyEmails } from '../sendMails/sendMails';
import { sendEmailWhenUserIsCreated } from '../sendMails/sendMails';
import { Cart } from 'src/entities/cart.entity';
import { Status } from 'src/enum/status.enum';
dotenvConfig({ path: '.env' });

@Injectable()
export class AuthRepository implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly cartRepository: CartRepository
  ) { }

  async onModuleInit(): Promise<void> {
    cron.schedule('0 14 * * 5', async () => {
      this.send();
    });
  }

  async send(): Promise<void> {
    try {
      const users: User[] = await this.userRepository.find({ where: { subscribed: true } });

      for (const user of users) {
        await sendWeeklyEmails(user);
      }
    } catch (error) {
      console.error('Error sending weekly emails:', error);
    }
  }


  async registerEmailAndPassword(email: string, password: string, rest: any): Promise<User> {
    try {
      const user: User = await this.repository.findByEmail(email);
      if (user) {
        throw new BadRequestException('User already exists');
      }
      const hashedPassword: string = await bcrypt.hash(password, 10);

      const createdUser: User = await this.repository.create({
        email,
        password: hashedPassword,
        ...rest,
        status: Status.Pending,
      });
      const cart: Cart = await this.cartRepository.createCart(createdUser)
      createdUser.cart = cart
      await this.userRepository.save(createdUser)

      sendEmailWhenUserIsCreated(createdUser)    
      return createdUser;


    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(email: string, password: string): Promise<{ message: string, token: string }> {
    try {
      const user: User = await this.repository.findByEmail(email);

      if (!user) {
        throw new NotFoundException('Invalid credentials');
      }
      const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new NotFoundException('Invalid credentials');
      }
      const token: string = await this.createJwtToken(user);
      return {
        message: 'Login successful',
        token,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createJwtToken(user: any): Promise<string> {
    const payload: any = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  async googleLogin(data: any): Promise<{ createdUser: User, isNew: boolean }> {
    return runWithTryCatchBadRequest(async () => {
      const user: User = await this.repository.findByEmail(data.email);
      if (!user) {

        const name = data.firstName + ' ' + data.LastName;
        const email = data.email;
        const newUser = {
          name: name || '',
          email: email,
          password: '',
          address: '',
          phone: '',
          role: Role.User,
          image: data.picture,
          status: Status.Pending,
        };
        const createdUser: User = await this.repository.create(newUser);
        const cart: Cart = await this.cartRepository.createCart(createdUser);
        createdUser.cart = cart;
        await this.userRepository.save(createdUser);
        return { createdUser, isNew: true };
      } else {
        return { createdUser: user, isNew: false };
      }
    });
  }


}

async function runWithTryCatchBadRequest<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw error;
    } else {
      throw new InternalServerErrorException(error);
    }
  }
}
