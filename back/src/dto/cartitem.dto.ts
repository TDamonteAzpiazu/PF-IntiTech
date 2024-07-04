import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CartItemDto {
  @ApiProperty({
    description: 'The ID of the panel',
    example: '1234567890abcdef12345678',
  })
  @IsString()
  @IsNotEmpty()
  panel_id: string;

  @ApiProperty({
    description: 'The quantity of the item in the cart',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
