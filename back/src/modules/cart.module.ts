import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartController } from "src/controllers/cart.controller";
import { Cart } from "src/entities/cart.entity";
import { CartRepository } from "src/repositories/cart.repository";
import { CartService } from "src/services/cart.service";


@Module({
    imports: [TypeOrmModule.forFeature([Cart])],
    controllers: [CartController],
    providers: [CartService,CartRepository],
    
})

export class CartModule {}