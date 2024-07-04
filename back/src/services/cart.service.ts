import { Injectable } from '@nestjs/common';
import { CartItemDto } from 'src/dto/cartitem.dto';
import { CartRepository } from 'src/repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) { }

  async getCartItems(cart_id: string) {
    return await this.cartRepository.getCartItems(cart_id);
  }

  async addItemToCart(cart_id: string, cart_item: CartItemDto) {
    return await this.cartRepository.addItemToCart(cart_id, cart_item);
  }

  async deleteItemFromCart(cart_itemId: string) {
    return await this.cartRepository.deleteItemFromCart(cart_itemId);
  }

  async clearCart(cart_id: string) {
    return await this.cartRepository.clearCart(cart_id);
  }

  async substractOneFromCartItem(cart_itemId: string) {
    return await this.cartRepository.substractOneFromCartItem(cart_itemId);
  }

  async addOneToCartItem(cart_itemId: string) {
    return await this.cartRepository.addOneToCartItem(cart_itemId);
  }

  async createRecord(cart_id: string) {
    return await this.cartRepository.createRecord(cart_id);
  }
}
