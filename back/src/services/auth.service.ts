import { Injectable } from "@nestjs/common";
import { AuthRepository } from "src/repositories/auth.repository";

@Injectable()
export class AuthService {
    constructor( private readonly authRepository: AuthRepository ) {}

    async registerEmailAndPassword(body: any) {
        const { email, password , name, address, phone, country, image } = body;
        return await this.authRepository.registerEmailAndPassword(email, password, { name, address, phone, country, image });
    }

    async login(body: any) {
        const { email, password } = body;
        return await this.authRepository.login(email, password);
    }

}