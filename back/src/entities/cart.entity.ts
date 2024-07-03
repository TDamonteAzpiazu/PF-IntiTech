import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CartItem } from './cartItem.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ default: 0 })
  totalPrice: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  @JoinColumn()
  cartItems: CartItem[];
}
