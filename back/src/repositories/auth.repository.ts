import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { Role } from 'src/enum/role.enum';
import { config as dotenvConfig } from 'dotenv';
import { transporter } from 'src/config/mailer';
dotenvConfig({ path: '.env' });

@Injectable()
export class AuthRepository {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registerEmailAndPassword(email: string, password: string, rest: any) {
    try {
      const user = await this.repository.findByEmail(email);
      if (user) {
        throw new BadRequestException('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      return await this.repository.create({
        email,
        password: hashedPassword,
        ...rest,
      });
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
      console.log(user);
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
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  async googleLogin(req) {
    const user = await this.repository.findByEmail(req.user.email);

    if (!user) {
      const name = req.user.firstName + ' ' + req.user.LastName;
      const hashedname = await bcrypt.hash(name, 10);
      const newUser = {
        name: name || '',
        email: req.user.email,
        password: hashedname || '',
        address: '',
        phone: '',
        role: Role.User,
        image: req.user.picture,
        status: 'active',
      };
      const createdUser = await this.repository.create(newUser);
      return { user: createdUser, isNew: true };
    } else {
      return { user, isNew: false };
    }
  }

  async sendEmail(user, jwt) {
    await transporter.sendMail({
      from: '"Example email 👻" <pablorodriguez6002@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Test ✔', // Subject line
      html: `<b>Please click on the link below</b> <a href= ${process.env.URL}?token=${jwt}>Test</a>`, // html body
    });
  }
}
