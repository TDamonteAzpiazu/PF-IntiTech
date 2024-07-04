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
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsNotEmpty } from 'class-validator';

@Entity('cart')
export class Cart {
  @ApiProperty({
    description: 'The id of the cart',
    example: '74a514f2-9c6c-4e72-a909-66aed6bfbd6f',
  })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty({
    description: 'The total price of the cart',
    example: 150.5,
  })
  @Column({ default: 0 })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({
    description: 'The user associated with the cart',
    type: () => User,
  })
  @OneToOne(() => User)
  @JoinColumn()
  @IsNotEmpty()
  user: User;

  @ApiProperty({
    description: 'The items in the cart',
    type: () => [CartItem],
  })
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  @JoinColumn()
  @IsNotEmpty()
  cartItems: CartItem[];
}
