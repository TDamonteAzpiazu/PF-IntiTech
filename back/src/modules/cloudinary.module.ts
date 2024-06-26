/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloudinaryConfig } from "src/config/cloudinary";
import { CloudinaryController } from "src/controllers/cloudinary.controller";
import { User } from "src/entities/user.entity";
import { CloudinaryService } from "src/services/cloudinary.service";
import { UserService } from "src/services/user.service";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [CloudinaryController],
    providers: [CloudinaryService,UserService,CloudinaryConfig], 
    
})
export class CloudinaryModule {}