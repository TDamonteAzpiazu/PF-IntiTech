import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid } from "uuid";
import { CartItem } from "./cartItem.entity";


@Entity("cart")
export class Cart{


    @PrimaryGeneratedColumn("uuid")
    id:string = uuid()

    @OneToMany( () =>  CartItem, cartItem => cartItem.cart) 
    cartItems: CartItem[]
}