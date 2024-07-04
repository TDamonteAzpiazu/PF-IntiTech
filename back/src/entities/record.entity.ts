import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { CartItem } from "./cartItem.entity";
import { ItemRecord } from "./itemRecord.entity";
import { User } from "./user.entity";

@Entity()
export class Record {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column()
    totalPrice: number

    @ManyToOne(() => User, (user) => user.records)
    @JoinColumn()
    user: User

    @OneToMany(() => ItemRecord, (itemRecord) => itemRecord.record)
    itemRecords: ItemRecord[]
}