/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryController } from 'src/controllers/cloudinary.controller';
import { PanelForSale } from 'src/entities/panelForSale.entity';
import { User } from 'src/entities/user.entity';
import { PanelForSaleRepository } from 'src/repositories/panelForSale.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { CloudinaryService } from 'src/services/cloudinary.service';
import { PanelForSaleService } from 'src/services/panelForSale.service';
import { UserService } from 'src/services/user.service';
import { CartModule } from './cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, PanelForSale]), CartModule],
  controllers: [CloudinaryController],
  providers: [
    PanelForSaleRepository,
    PanelForSaleService,
    CloudinaryService,
    CloudinaryConfig,
    UserRepository,
    UserService,
  ],
})
export class CloudinaryModule {}
