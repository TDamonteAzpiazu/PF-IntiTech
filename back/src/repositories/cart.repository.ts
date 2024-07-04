import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemDto } from 'src/dto/cartitem.dto';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { ItemRecord } from 'src/entities/itemRecord.entity';
import { PanelForSale } from 'src/entities/panelForSale.entity';
import { Record } from 'src/entities/record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartRepository {
    constructor(
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
        @InjectRepository(PanelForSale)
        private readonly panelForSaleRepository: Repository<PanelForSale>,
        @InjectRepository(Record) private readonly recordRepository: Repository<Record>,
        @InjectRepository(ItemRecord) private readonly itemRecordRepository: Repository<ItemRecord>
    ) { }

    async getCartItems(cart_id: string) {
        const cart = await this.cartRepository.findOneBy({ id: cart_id });
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        return await this.cartItemRepository.find({ where: { cart } });
    }

    async createCart(user): Promise<Cart> {
        const cart = this.cartRepository.create({
            user: user,
        });
        return await this.cartRepository.save(cart);
    }

    async addItemToCart(cart_id: string, cart_item: CartItemDto) {
        let totalPricePerItem = 0;
        const cart = await this.cartRepository.findOneBy({ id: cart_id });

        const panel = await this.panelForSaleRepository.findOneBy({
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

        const cartsItems = await this.cartItemRepository.find({ where: { cart } });

        for (const item of cartsItems) {
            if (item.panel_id === cart_item.panel_id) {
                item.quantity += cart_item.quantity;
                item.totalPrice += totalPricePerItem;
                cart.totalPrice += totalPricePerItem;
                await this.cartRepository.save(cart);
                return await this.cartItemRepository.save(item);
            }
        }

        const newCartItem = this.cartItemRepository.create({
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


    async deleteItemFromCart(cart_itemId: string) {
        console.log("Hola");

        const cartItem = await this.cartItemRepository.findOne({ where: { id: cart_itemId }, relations: ['cart'] });

        console.log(cartItem);
        console.log("Hola2");

        const product = await this.panelForSaleRepository.findOne({
            where: { id: cartItem.panel_id },
        });

        product.stock += cartItem.quantity;
        await this.panelForSaleRepository.save(product);

        const cart = await this.cartRepository.findOneBy({
            id: cartItem.cart.id,
        });
        cart.totalPrice -= cartItem.totalPrice;
        await this.cartRepository.save(cart);

        await this.cartItemRepository.remove(cartItem);
        return 'Item deleted successfully';
    }

    async clearCart(cart_id: string) {
        const cart = await this.cartRepository.findOneBy({ id: cart_id });
        const items = await this.cartItemRepository.find({ where: { cart } });
        for (const item of items) {
            const product = await this.panelForSaleRepository.findOne({
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

    async substractOneFromCartItem(cart_itemId: string) {
        const cartItem = await this.cartItemRepository.findOne({ where: { id: cart_itemId }, relations: ['cart'] });

        if (!cartItem) {
            throw new NotFoundException('Cart item not found');
        }

        const cart = await this.cartRepository.findOneBy({
            id: cartItem.cart.id,
        })

        const product = await this.panelForSaleRepository.findOne({
            where: { id: cartItem.panel_id }
        })

        product.stock += 1;
        await this.panelForSaleRepository.save(product);
        cartItem.quantity -= 1;
        cartItem.totalPrice -= product.price;
        await this.cartItemRepository.save(cartItem);
        cart.totalPrice -= product.price;
        await this.cartRepository.save(cart);
        return cartItem;
    }

    async addOneToCartItem(cart_itemId: string) {
        const cartItem = await this.cartItemRepository.findOne({ where: { id: cart_itemId }, relations: ['cart'] });

        if (!cartItem) {
            throw new NotFoundException('Cart item not found');
        }

        const product = await this.panelForSaleRepository.findOne({
            where: { id: cartItem.panel_id }
        });

        const cart = await this.cartRepository.findOneBy({
            id: cartItem.cart.id
        })

        product.stock -= 1;
        await this.panelForSaleRepository.save(product);
        cartItem.quantity += 1;
        cartItem.totalPrice += product.price;
        await this.cartItemRepository.save(cartItem);
        cart.totalPrice += product.price;
        await this.cartRepository.save(cart);
        return cartItem;
    }

    async createRecord(cart_id: string) {
        const cart = await this.cartRepository.findOne({ where: { id: cart_id }, relations: ['user'] });

        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        const items = await this.cartItemRepository.find({ where: { cart } });

        const record = this.recordRepository.create({ totalPrice: cart.totalPrice, user: cart.user });
        console.log(record);

        await this.recordRepository.save(record);

        for (const item of items) {
            const recordItem = this.itemRecordRepository.create({
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
}
