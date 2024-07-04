import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CartItem } from './cartItem.entity';
import { User } from './user.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ default: 0 })
  totalPrice: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  @JoinColumn()
  cartItems: CartItem[];
}
