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
import { CartRepository } from './cart.repository';
import { User } from 'mercadopago';
dotenvConfig({ path: '.env' });

@Injectable()
export class AuthRepository {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly cartRepository: CartRepository
  ) { }

  async registerEmailAndPassword(email: string, password: string, rest: any) {
    try {
      const cart = await this.cartRepository.createCart()
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
        cart: cart
      });

      await this.sendEmailWhenUserIsCreated(createdUser)

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
        return { createdUser, isNew: true };
      } else {
        return { createdUser: user, isNew: false };
      }
    });
  }

  async sendEmail(user: any, jwt: string) {
    await transporter.sendMail({
      from: '"Test 👻" <pablorodriguez6002@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Bienvenido a Intitech!', // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #FFA500;">¡Gracias por registrarte, <span style="color: #FFD700;">${user.name}</span>!</h2>
          <p>Estamos emocionados de tenerte con nosotros. Nuestra empresa se dedica a ofrecer paneles solares y robots de alta calidad para la venta de los mismos.</p>
          <p>Para completar tu registro, por favor haz clic en el siguiente botón:</p>
          <a href="${process.env.URL}?token=${jwt}" style="text-decoration: none;">
            <button style="background: linear-gradient(90deg, #FFD700, #FFA500); color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
              Activa tu cuenta
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

  async sendEmailWhenUserIsCreated(user: any) {
    await transporter.sendMail({
      from: '"Test 👻" <pablorodriguez6002@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: 'Bienvenido a Intitech!', // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #FFA500;">¡Gracias por registrarte, <span style="color: #FFD700;">${user.name}</span>!</h2>
          <p>Estamos emocionados de tenerte con nosotros. Nuestra empresa se dedica a ofrecer paneles solares y robots de alta calidad para la venta de los mismos.</p>
          <p>Para completar tu registro, por favor haz clic en el siguiente botón:</p>
          <a href="${process.env.URL}" style="text-decoration: none;">
            <button style="background: linear-gradient(90deg, #FFD700, #FFA500); color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
              Activa tu cuenta
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
