import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { CartItem } from "./cartItem.entity";

export class Record {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column()
    totalPrice: number

    // @OneToMany(() => CartItem, (cartItem) => cartItem.record)
    // cartItems: CartItem[]
}