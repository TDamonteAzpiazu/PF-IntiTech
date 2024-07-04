import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Cart } from './cart.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsString, IsNotEmpty } from 'class-validator';

@Entity({ name: 'cartitem' })
export class CartItem {
  @ApiProperty({
    description: 'The id of the cart item',
    example: 'e9f2d7b2-24a6-4d70-bd9d-5f7a97c8b1f9',
  })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty({
    description: 'The total price of the cart item',
    example: 99.99,
  })
  @Column()
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({
    description: 'The ID of the panel associated with the cart item',
    example: 'b1d3d4b2-0a7c-4f9e-abc6-7d01234e56f7',
  })
  @Column({ nullable: false })
  @IsUUID()
  @IsNotEmpty()
  panel_id: string;

  @ApiProperty({
    description: 'The quantity of the cart item',
    example: 2,
  })
  @Column({ nullable: false })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'The image URL of the panel associated with the cart item',
    example: 'https://example.com/image.jpg',
  })
  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  panel_image: string;

  @ApiProperty({
    description: 'The model name of the panel associated with the cart item',
    example: 'Model X',
  })
  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  panel_model: string;

  @ApiProperty({
    description: 'The cart to which the item belongs',
    type: () => Cart,
  })
  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn()
  @IsNotEmpty()
  cart: Cart;
}
