/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity('panelforsale')
export class PanelForSale {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({nullable : false})
    brand: string

    @Column({nullable : false})
    model: string

    @Column({nullable : false})
    price: number

    @Column({nullable : false})
    stock: number

    @Column({nullable : false})
    description: string

    @Column({nullable : false})
    size: string

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    dailyGeneration: number

    @Column({ default: 'https://res.cloudinary.com/dc8tneepi/image/upload/nnpuge2eky9kzbswxmbk.jpg'})
    image: string
}