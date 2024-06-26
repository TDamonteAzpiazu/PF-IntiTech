import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { AuthController } from "src/controllers/auth.controller";
import { AuthService } from "src/services/auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {}