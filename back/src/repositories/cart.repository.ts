import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CartItemDto } from 'src/dto/cartitem.dto';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { ItemRecord } from 'src/entities/itemRecord.entity';
import { PanelForSale } from 'src/entities/panelForSale.entity';
import { Record } from 'src/entities/record.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { AllRecordDto } from 'src/dto/allRecords.dto';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(PanelForSale)
    private readonly panelForSaleRepository: Repository<PanelForSale>,
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    @InjectRepository(ItemRecord)
    private readonly itemRecordRepository: Repository<ItemRecord>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getCartItems(cart_id: string): Promise<CartItem[]> {
    const cart: Cart = await this.cartRepository.findOneBy({ id: cart_id });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return await this.cartItemRepository.find({ where: { cart } });
  }

  async createCart(user: User): Promise<Cart> {
    const cart: Cart = this.cartRepository.create({
      user: user,
    });
    return await this.cartRepository.save(cart);
  }

  async addItemToCart(
    cart_id: string,
    cart_item: CartItemDto,
  ): Promise<CartItem> {
    let totalPricePerItem = 0;
    const cart: Cart = await this.cartRepository.findOneBy({ id: cart_id });

    const panel: PanelForSale = await this.panelForSaleRepository.findOneBy({
      id: cart_item.panel_id,
    });
    if (!panel) {
      throw new NotFoundException('Panel not found');
    }

    panel.stock -= cart_item.quantity;
    const panel_image = panel.image;
    const panel_name = panel.model;
    totalPricePerItem += panel.price * cart_item.quantity;
    await this.panelForSaleRepository.save(panel);

    const cartsItems: CartItem[] = await this.cartItemRepository.find({
      where: { cart },
    });

    for (const item of cartsItems) {
      if (item.panel_id === cart_item.panel_id) {
        item.quantity += cart_item.quantity;
        item.totalPrice += totalPricePerItem;
        cart.totalPrice += totalPricePerItem;
        await this.cartRepository.save(cart);
        return await this.cartItemRepository.save(item);
      }
    }

    const newCartItem: CartItem = this.cartItemRepository.create({
      panel_id: cart_item.panel_id,
      quantity: cart_item.quantity,
      panel_image: panel_image,
      panel_model: panel_name,
      totalPrice: totalPricePerItem,
      cart: cart,
    });
    cart.totalPrice += totalPricePerItem;
    await this.cartRepository.save(cart);
    return await this.cartItemRepository.save(newCartItem);
  }

  async deleteItemFromCart(cart_itemId: string): Promise<string> {
    const cartItem: CartItem = await this.cartItemRepository.findOne({
      where: { id: cart_itemId },
      relations: ['cart'],
    });

    const product: PanelForSale = await this.panelForSaleRepository.findOne({
      where: { id: cartItem.panel_id },
    });

    product.stock += cartItem.quantity;
    await this.panelForSaleRepository.save(product);

    const cart: Cart = await this.cartRepository.findOneBy({
      id: cartItem.cart.id,
    });
    cart.totalPrice -= cartItem.totalPrice;
    await this.cartRepository.save(cart);

    await this.cartItemRepository.remove(cartItem);
    return 'Item deleted successfully';
  }

  async clearCart(cart_id: string): Promise<string> {
    const cart: Cart = await this.cartRepository.findOneBy({ id: cart_id });
    const items: CartItem[] = await this.cartItemRepository.find({
      where: { cart },
    });
    for (const item of items) {
      const product: PanelForSale = await this.panelForSaleRepository.findOne({
        where: { id: item.panel_id },
      });
      product.stock += item.quantity;
      await this.panelForSaleRepository.save(product);
    }
    cart.totalPrice = 0;
    await this.cartRepository.save(cart);
    await this.cartItemRepository.remove(items);
    return 'All items deleted successfully';
  }

  async substractOneFromCartItem(cart_itemId: string): Promise<CartItem> {
    const cartItem: CartItem = await this.cartItemRepository.findOne({
      where: { id: cart_itemId },
      relations: ['cart'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    const cart: Cart = await this.cartRepository.findOneBy({
      id: cartItem.cart.id,
    });

    const product: PanelForSale = await this.panelForSaleRepository.findOne({
      where: { id: cartItem.panel_id },
    });

    product.stock += 1;
    await this.panelForSaleRepository.save(product);
    cartItem.quantity -= 1;
    cartItem.totalPrice -= product.price;
    await this.cartItemRepository.save(cartItem);
    cart.totalPrice -= product.price;
    await this.cartRepository.save(cart);
    return cartItem;
  }

  async addOneToCartItem(cart_itemId: string): Promise<CartItem> {
    const cartItem: CartItem = await this.cartItemRepository.findOne({
      where: { id: cart_itemId },
      relations: ['cart'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    const product: PanelForSale = await this.panelForSaleRepository.findOne({
      where: { id: cartItem.panel_id },
    });

    const cart: Cart = await this.cartRepository.findOneBy({
      id: cartItem.cart.id,
    });

    product.stock -= 1;
    await this.panelForSaleRepository.save(product);
    cartItem.quantity += 1;
    cartItem.totalPrice += product.price;
    await this.cartItemRepository.save(cartItem);
    cart.totalPrice += product.price;
    await this.cartRepository.save(cart);
    return cartItem;
  }

  async createRecord(cart_id: string): Promise<string> {
    const cart: Cart = await this.cartRepository.findOne({
      where: { id: cart_id },
      relations: ['user'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const items: CartItem[] = await this.cartItemRepository.find({
      where: { cart },
    });

    if (items.length === 0) {
      throw new NotFoundException('Cart items not found');
    }

    const record: Record = this.recordRepository.create({
      totalPrice: cart.totalPrice,
      user: cart.user,
    });

    await this.recordRepository.save(record);

    for (const item of items) {
      const recordItem: ItemRecord = this.itemRecordRepository.create({
        panel_id: item.panel_id,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        panel_image: item.panel_image,
        panel_model: item.panel_model,
        record: record,
      });
      await this.itemRecordRepository.save(recordItem);
    }
    cart.totalPrice = 0;
    await this.cartRepository.save(cart);
    await this.cartItemRepository.remove(items);

    return 'All items deleted and record created successfully';
  }

  async getAllRecords(user_id: string): Promise<AllRecordDto[]> {
    const allRecords: AllRecordDto[] = [];
    const records: Record[] = await this.recordRepository.find({
      where: { user: { id: user_id } },
    });

    if (records.length === 0) {
      throw new NotFoundException('Records not found');
    }

    for (const record of records) {
      const items: ItemRecord[] = await this.itemRecordRepository.find({
        where: { record },
      });

      const recordWithItems: AllRecordDto = {
        record: {
          ...record,
          items: items.map((item) => ({
            id: item.id,
            totalPrice: item.totalPrice,
            panel_id: item.panel_id,
            quantity: item.quantity,
            panel_image: item.panel_image,
            panel_model: item.panel_model,
          })),
        },
      };

      allRecords.push(recordWithItems);
    }

    return allRecords;
  }

  async getRecordByMonth(month: number, year: number) : Promise<Record[]> {
    const startDate = new Date(year, month -1 , 1);
    const endDate = new Date(year, month , 1);

    const records: Record[] = await this.recordRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
    });

    return records;
  }
}
