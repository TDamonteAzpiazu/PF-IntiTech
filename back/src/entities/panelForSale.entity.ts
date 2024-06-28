/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity('panelforsale')
export class PanelForSale {

    @ApiProperty({
        description: 'The id of the panel',
        example: '74a514f2-9c6c-4e72-a909-66aed6bfbd6f',
    })
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @ApiProperty({
        description: 'The brand of the panel',
        example: 'SunPower',
    })
    @Column({nullable : false})
    brand: string

    @ApiProperty({
        description: 'The model of the panel',
        example: 'Maxeon 3 400W',
    })
    @Column({nullable : false})
    model: string

    @ApiProperty({
        description: 'The price of the panel',
        example: 350,
    })
    @Column({nullable : false})
    price: number

    @ApiProperty({
        description: 'The stock of the panel',
        example: 50,
    })
    @Column({nullable : false})
    stock: number

    @ApiProperty({
        description: 'The description of the panel',
        example: 'High efficiency solar panel with 400W power output.',
    })
    @Column({nullable : false})
    description: string

    @ApiProperty({
        description: 'The size of the panel',
        example: '1046 x 1690 mm',
    })
    @Column({nullable : false})
    size: string

    @ApiProperty({
        description: 'The daily generation of the panel',
        example: 4.8,
    })
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    dailyGeneration: number

    @ApiProperty({
        description: 'The image of the panel',
        example: 'https://res.cloudinary.com/dc8tneepi/image/upload/nnpuge2eky9kzbswxmbk.jpg',
    })
    @Column({ default: 'https://res.cloudinary.com/dc8tneepi/image/upload/nnpuge2eky9kzbswxmbk.jpg'})
    image: string
}