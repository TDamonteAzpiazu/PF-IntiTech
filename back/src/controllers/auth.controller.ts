import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    //La ruta debería tambien recibir un archivo opcional para la foto de perfil
    async registerEmailAndPassword(@Body() body: any) : Promise<any> {
        return await this.authService.registerEmailAndPassword(body);
    }

    @Post('login')
    async login(@Body() body: any) : Promise<any> {
        return await this.authService.login(body);
    }

}