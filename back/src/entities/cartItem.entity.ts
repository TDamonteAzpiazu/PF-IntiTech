import { Column, Entity,  ManyToOne,  OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { PanelForSale } from "./panelForSale.entity";
import { Cart } from "./cart.entity";

//esta entity representa los elementos del carrito de compras
@Entity({name:"cartitem"})
export class CartItem{

    @PrimaryGeneratedColumn("uuid")
    id:string=uuid();

    @Column({  nullable: false })
    quantity:number;

    @OneToOne(()=>PanelForSale)
    panelForSale:PanelForSale

    @ManyToOne(()=>Cart, (cart)=>cart.cartItems)
    cart:Cart

}