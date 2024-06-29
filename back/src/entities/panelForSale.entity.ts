/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity('panelforsale')
export class PanelForSale {

    @ApiProperty({
        description: 'The id of the panel',
        example: '74a514f2-9c6c-4e72-a909-66aed6bfbd6f',
    })
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string = uuid()

    @ApiProperty({
        description: 'The brand of the panel',
        example: 'SunPower',
    })
    @Column({nullable : false})
    @IsString()
    @IsNotEmpty()
    brand: string

    @ApiProperty({
        description: 'The model of the panel',
        example: 'Maxeon 3 400W',
    })
    @Column({nullable : false})
    @IsString()
    @IsNotEmpty()
    model: string

    @ApiProperty({
        description: 'The price of the panel',
        example: 350,
    })
    @Column({nullable : false})
    @IsNumber()
    @IsNotEmpty()
    price: number

    @ApiProperty({
        description: 'The stock of the panel',
        example: 50,
    })
    @Column({nullable : false})
    @IsNumber()
    @IsNotEmpty()
    stock: number

    @ApiProperty({
        description: 'The description of the panel',
        example: 'High efficiency solar panel with 400W power output.',
    })
    @Column({nullable : false})
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description: 'The size of the panel',
        example: '1046 x 1690 mm',
    })
    @Column({nullable : false})
    @IsString()
    @IsNotEmpty()
    size: string

    @ApiProperty({
        description: 'The daily generation of the panel',
        example: 4.8,
    })
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    @IsNumber()
    dailyGeneration: number

    @ApiProperty({
        description: 'The image of the panel',
        example: 'https://res.cloudinary.com/dc8tneepi/image/upload/nnpuge2eky9kzbswxmbk.jpg',
    })
    @Column({ default: 'https://res.cloudinary.com/dc8tneepi/image/upload/nnpuge2eky9kzbswxmbk.jpg'})
    @IsString()
    @IsNotEmpty()
    image: string
}