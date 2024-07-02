import { Injectable } from '@nestjs/common';
import { CartItemDto } from 'src/dto/cartitem.dto';
import { CartRepository } from 'src/repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async addProductToCart(cart_id: string, cart_item: CartItemDto) {
    return await this.cartRepository.addProductToCart(cart_id, cart_item);
  }

  async deleteItemFromCart(cart_itemId: string) {
    return await this.cartRepository.deleteItemFromCart(cart_itemId);
  }
}
