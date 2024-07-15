import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddItemToCartSwagger, ClearCartSwagger, CreateRecordSwagger, GetCartItemsSwagger } from 'src/decorators/cart.decorator';
import { AllRecordDto } from 'src/dto/allRecords.dto';
import { CartItemDto } from 'src/dto/cartitem.dto';
import { CartItem } from 'src/entities/cartItem.entity';
import { Record } from 'src/entities/record.entity';
import { CartService } from 'src/services/cart.service';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get('getItems/:id') // id de cart
  @GetCartItemsSwagger()
  async getCartItems(@Param('id', ParseUUIDPipe) cart_id: string): Promise<CartItem[]> {
    return await this.cartService.getCartItems(cart_id);
  }

  @Get("getRecordsByMonth")
  async getRecordByMonth(@Query("month") month : number , @Query("year") year:number ): Promise<Record[]> {
    return await this.cartService.getRecordByMonth(month , year);
  }
  @Post('add/:id') // id de cart
  @AddItemToCartSwagger()
  async addItemToCart(
    @Param('id', ParseUUIDPipe) cart_id: string,
    @Body() cart_item: CartItemDto,
  ): Promise<CartItem> {
    return await this.cartService.addItemToCart(cart_id, cart_item);
  }

  @Delete('clearCart/:id') // id de cart
  @ClearCartSwagger()
  async clearCart(@Param('id', ParseUUIDPipe) cart_id: string): Promise<string> {
    return await this.cartService.clearCart(cart_id);
  }

  @Delete(':id') // id de cart
  async deleteItemFromCart(@Param('id', ParseUUIDPipe) cart_itemId: string): Promise<string> {
    return await this.cartService.deleteItemFromCart(cart_itemId);
  }

  @Put('substract/:id') // id de cartItem
  async substractOneFromCartItem(@Param('id', ParseUUIDPipe) cart_itemId: string): Promise<CartItem> {
    return await this.cartService.substractOneFromCartItem(cart_itemId);
  }

  @Put('add/:id') // id de cartItem
  async addOneToCartItem(@Param('id', ParseUUIDPipe) cart_itemId: string): Promise<CartItem> {
    return await this.cartService.addOneToCartItem(cart_itemId);
  }

  @Post('createRecord/:id') // id de cart
  @CreateRecordSwagger()
  async createRecord(@Param('id', ParseUUIDPipe) cart_id: string): Promise<string> {
    return await this.cartService.createRecord(cart_id);
  }

  @Get('getAllRecords/:id') // id de user
  async getAllRecords(@Param('id', ParseUUIDPipe) user_id: string): Promise<AllRecordDto[]> {
    return await this.cartService.getAllRecords(user_id);
  }
}