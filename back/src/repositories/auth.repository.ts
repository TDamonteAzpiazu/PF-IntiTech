import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './user.repository';
import { UserService } from 'src/services/user.service';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async registerEmailAndPassword(email: string, password: string, rest: any) {
    try {
      const user = await this.repository.findByEmail(email);
      if (user) {
        throw new BadRequestException('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      //Cloudinary para la foto de perfil
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
      if (!user) {
        throw new NotFoundException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new NotFoundException('Invalid credentials');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createJwtToken(user: any): Promise<string> {
    const payload = { email: user.email };
    return this.jwtService.sign(payload);
  }

  async googleLogin(req) {
    console.log(req.user);
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
      };
      await this.repository.create(newUser);

      return 'User created successfully';
    } else {
      console.log('User already exists');
      return user;
    }
  }
}