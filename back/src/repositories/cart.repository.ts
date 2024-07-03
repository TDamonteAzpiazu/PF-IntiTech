import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemDto } from 'src/dto/cartitem.dto';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { PanelForSale } from 'src/entities/panelForSale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartRepository {
    constructor(
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
        @InjectRepository(PanelForSale)
        private readonly panelForSaleRepository: Repository<PanelForSale>,
    ) { }

    async createCart(): Promise<Cart> {
        const cart = this.cartRepository.create();
        return await this.cartRepository.save(cart);
    }

    async addProductToCart(cart_id: string, cart_item: CartItemDto) {
        let totalPricePerItem = 0;
        const cart = await this.cartRepository.findOneBy({ id: cart_id });
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        const panel = await this.panelForSaleRepository.findOneBy({
            id: cart_item.panel_id,
        });
        if (!panel) {
            throw new NotFoundException('Panel not found');
        }

        panel.stock -= cart_item.quantity;
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
            totalPrice: totalPricePerItem,
            cart: cart,
        });
        cart.totalPrice += totalPricePerItem;
        await this.cartRepository.save(cart);
        return await this.cartItemRepository.save(newCartItem);
    }


    async deleteItemFromCart(cart_itemId: string) {
        const cartItem = await this.cartItemRepository.findOneBy({
            id: cart_itemId,
        });

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

    async deleteAllItemsFromCart(cart_id: string) {
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
        const cartItem = await this.cartItemRepository.findOneBy({
            id: cart_itemId,
        });

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
        const cartItem = await this.cartItemRepository.findOneBy({
            id: cart_itemId,
        });

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
}
