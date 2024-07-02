import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart.entity";
import { Repository } from "typeorm";


@Injectable()
export class CartRepository {
    constructor(
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    ) {}

    async createCart(): Promise<Cart> {
        const cart= this.cartRepository.create();
        return await this.cartRepository.save(cart);
    }


}
