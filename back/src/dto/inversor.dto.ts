import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class InversorDto {
  @ApiProperty({
    description: 'The name of the inversor',
    example: 'SolarTech Ltd.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
