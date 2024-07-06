import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { CredentialsDto } from 'src/dto/credentials.dto';
import { AuthRepository } from 'src/repositories/auth.repository';
import { sendEmail } from '../sendMails/sendMails';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository,
  ) { }

  async registerEmailAndPassword(body: CreateUserDto): Promise<User> {
    const { email, password, name, address, phone } = body;
    return await this.authRepository.registerEmailAndPassword(email, password, {
      name,
      address,
      phone,
    });
  }

  async login(body: CredentialsDto): Promise<{ message: string, token: string }> {
    const { email, password } = body;
    return await this.authRepository.login(email, password);
  }

  async createToken(user: User) {
    return await this.authRepository.createJwtToken(user);
  }

  async googleLogin(data: any): Promise<{ createdUser: User, isNew: boolean }> {
    return await this.authRepository.googleLogin(data);
  }

  async sendEmail(user: User, jwt: string): Promise<void> {
    return await sendEmail(user, jwt);
  }
}
