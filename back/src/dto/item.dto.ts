import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ItemDto {
  @ApiProperty({
    description: 'The unique identifier of the item',
    example: 'e2a21d3c-7c5e-4b9a-93c1-7857e9ef6cce',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The title or name of the item',
    example: 'Solar Panel',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The quantity of the item',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'The unit price of the item',
    example: 199.99,
  })
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;
}
