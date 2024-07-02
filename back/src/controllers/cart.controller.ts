import { Body, Controller, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { CartItemDto } from "src/dto/cartitem.dto";
import { CartService } from "src/services/cart.service";

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) {}

    @Post("add/:id")
    async addProductToCart(@Param("id",ParseUUIDPipe) cart_id: string ,@Body() cart_item: CartItemDto) {

        return await this.cartService.addProductToCart(cart_id, cart_item);

    }
}