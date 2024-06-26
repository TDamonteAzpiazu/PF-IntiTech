import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
    constructor(@InjectRepository(User) private readonly authRepository: Repository<User>) {}

    async registerEmailAndPassword(email: string, password: string, rest: any) {
        try {
            const user = await this.authRepository.findOne({ where: { email } });
            if (user) {
                throw new BadRequestException('User already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            //Cloudinary para la foto de perfil
            const newUser = this.authRepository.create({ email, password: hashedPassword, ...rest });
            return await this.authRepository.save(newUser);
        } catch (error) {
            if(error instanceof BadRequestException){
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async login(email: string, password: string) {
        try{
            const user = await this.authRepository.findOne({ where: { email } });
            if (!user){
                throw new NotFoundException('Invalid credentials')
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid){
                throw new NotFoundException('Invalid credentials')
            }
            return user
        } catch (error) {
            if(error instanceof NotFoundException){
                throw error;
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

}