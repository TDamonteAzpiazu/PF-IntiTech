import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class StatsDto {
  @ApiProperty({
    description: 'The date of the statistics in timestamp format',
    example: 1622505600000, // Timestamp example
  })
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  date: number;

  @ApiProperty({
    description: 'The photovoltaic generation in kilowatt-hours (kWh)',
    example: 350.75,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  pvGeneration: number;
}