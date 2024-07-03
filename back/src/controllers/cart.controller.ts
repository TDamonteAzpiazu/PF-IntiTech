import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CartItemDto } from 'src/dto/cartitem.dto';
import { CartService } from 'src/services/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('add/:id') // id de cart
  async addProductToCart(
    @Param('id', ParseUUIDPipe) cart_id: string,
    @Body() cart_item: CartItemDto,
  ) {
    return await this.cartService.addProductToCart(cart_id, cart_item);
  }

  @Delete('delete/:id') // id de cart
  async deleteItemFromCart(@Param('id', ParseUUIDPipe) cart_itemId: string) {
    return await this.cartService.deleteItemFromCart(cart_itemId);
  }

  @Put('substract/:id') // id de cartItem
  async substractOneFromCartItem(@Param('id', ParseUUIDPipe) cart_itemId: string) {
    return await this.cartService.substractOneFromCartItem(cart_itemId);
  }

  @Put('add/:id') // id de cartItem
  async addOneToCartItem(@Param('id', ParseUUIDPipe) cart_itemId: string) {
    return await this.cartService.addOneToCartItem(cart_itemId);
  }
}
