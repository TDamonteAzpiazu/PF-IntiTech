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
dotenvConfig({ path: '.env' });

@Injectable()
export class AuthRepository implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly cartRepository: CartRepository
  ) { }

  async onModuleInit() {
    cron.schedule('0 14 * * 5', async () => {
      this.send();
    });
  }

  async send() {
    try {
      const users = await this.userRepository.find({ where: { subscribed: true } });

      for (const user of users) {
        await sendWeeklyEmails(user);
      }
    } catch (error) {
      console.error('Error sending weekly emails:', error);
    }
  }




  async registerEmailAndPassword(email: string, password: string, rest: any) {
    try {
      const user = await this.repository.findByEmail(email);
      if (user) {
        throw new BadRequestException('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await this.repository.create({
        email,
        password: hashedPassword,
        ...rest,
        status: 'pending',
      });
      const cart = await this.cartRepository.createCart(createdUser)
      createdUser.cart = cart
      await this.userRepository.save(createdUser)

      await sendEmailWhenUserIsCreated(createdUser)
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.repository.findByEmail(email);

      if (!user) {
        throw new NotFoundException('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new NotFoundException('Invalid credentials');
      }
      const token = await this.createJwtToken(user);
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
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  async googleLogin(data: any) {
    return runWithTryCatchBadRequest(async () => {
      const user = await this.repository.findByEmail(data.email);
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
          status: 'pending',
        };
        const createdUser = await this.repository.create(newUser);
        const cart = await this.cartRepository.createCart(createdUser);
        createdUser.cart = cart;
        await this.userRepository.save(createdUser);
        return { createdUser, isNew: true };
      } else {
        return { createdUser: user, isNew: false };
      }
    });
  }


}

async function runWithTryCatchBadRequest<T>(fn: () => Promise<T>) {
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
