import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItemDto } from "src/dto/cartitem.dto";
import { Cart } from "src/entities/cart.entity";
import { CartItem } from "src/entities/cartItem.entity";
import { Repository } from "typeorm";


@Injectable()
export class CartRepository {
    
    constructor(
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
        @InjectRepository(CartItem) private readonly cartItemRepository: Repository<CartItem>
    ) {}

    async createCart(): Promise<Cart> {
        const cart= this.cartRepository.create();
        return await this.cartRepository.save(cart);
    }

    async addProductToCart(cart_id: string, cart_item: CartItemDto) {
        const cart = await this.cartRepository.findOneBy({ id: cart_id });
        if (!cart) {
            throw new NotFoundException("Cart not found");
        }

        

    }


}
