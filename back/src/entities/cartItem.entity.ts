import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { PanelForSale } from './panelForSale.entity';
import { Cart } from './cart.entity';

//esta entity representa los elementos del carrito de compras
@Entity({ name: 'cartitem' })
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  totalPrice: number;

  @Column({ nullable: false })
  panel_id: string;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn()
  cart: Cart;
}
