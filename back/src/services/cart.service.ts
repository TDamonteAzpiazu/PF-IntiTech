import { Injectable } from '@nestjs/common';
import { AllRecordDto } from 'src/dto/allRecords.dto';
import { CartItemDto } from 'src/dto/cartitem.dto';
import { CartItem } from 'src/entities/cartItem.entity';
import { Record } from 'src/entities/record.entity';
import { CartRepository } from 'src/repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async getCartItems(cart_id: string): Promise<CartItem[]> {
    return await this.cartRepository.getCartItems(cart_id);
  }

  async addItemToCart(
    cart_id: string,
    cart_item: CartItemDto,
  ): Promise<CartItem> {
    return await this.cartRepository.addItemToCart(cart_id, cart_item);
  }

  async deleteItemFromCart(cart_itemId: string): Promise<string> {
    return await this.cartRepository.deleteItemFromCart(cart_itemId);
  }

  async clearCart(cart_id: string): Promise<string> {
    return await this.cartRepository.clearCart(cart_id);
  }

  async substractOneFromCartItem(cart_itemId: string): Promise<CartItem> {
    return await this.cartRepository.substractOneFromCartItem(cart_itemId);
  }

  async addOneToCartItem(cart_itemId: string): Promise<{cartItem: CartItem, stock: number}> {
    return await this.cartRepository.addOneToCartItem(cart_itemId);
  }

  async createRecord(cart_id: string): Promise<string> {
    return await this.cartRepository.createRecord(cart_id);
  }

  async getAllRecords(user_id: string): Promise<AllRecordDto[]> {
    return await this.cartRepository.getAllRecords(user_id);
  }

  async getRecordByMonth(month : number , year : number): Promise<Record[]> {
    return await this.cartRepository.getRecordByMonth(month, year);
  }
}
