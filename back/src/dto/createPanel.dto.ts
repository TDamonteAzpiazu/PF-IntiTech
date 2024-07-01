import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreatePanelDto {
    @ApiProperty({
        description: 'The brand of the panel',
        example: 'SunPower',
    })
    brand : string;

    @ApiProperty({
        description: 'The model of the panel',
        example: 'Maxeon 3 400W',
    })
    model : string;
    
    @ApiProperty({
        description: 'The price of the panel',
        example: '350',
    })
    price : number;

    @ApiProperty({
        description: 'The stock of the panel',
        example: '50',
    })
    stock : number;

    @ApiProperty({
        description: 'The description of the panel',
        example: 'High efficiency solar panel with 400W power output.',
    })
    description: string;

    @ApiProperty({
        description: 'The size of the panel',
        example: '1046 x 1690 mm',
    })
    size : string;

    @ApiProperty({
        description: 'The daily generation of the panel',
        example: '4.8',
    })
    dailyGeneration : number;
    
    @ApiPropertyOptional({
        description: 'The image of the panel',
    })
    @IsOptional()
    image?: string;
}