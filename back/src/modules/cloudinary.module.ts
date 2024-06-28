/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloudinaryConfig } from "src/config/cloudinary";
import { CloudinaryController } from "src/controllers/cloudinary.controller";
import { PanelForSale } from "src/entities/panelForSale.entity";
import { User } from "src/entities/user.entity";
import { CloudinaryService } from "src/services/cloudinary.service";
import { PanelForSaleService } from "src/services/panelForSale.service";
import { UserService } from "src/services/user.service";


@Module({
    imports: [TypeOrmModule.forFeature([User,PanelForSale])],
    controllers: [CloudinaryController],
    providers: [CloudinaryService,UserService,CloudinaryConfig,PanelForSaleService], 
    
})
export class CloudinaryModule {}