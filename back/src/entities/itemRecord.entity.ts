import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Record } from "./record.entity";

@Entity()
export class ItemRecord {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column()
    totalPrice: number

    @Column({ nullable: false })
    panel_id: string;

    @Column({ nullable: false })
    quantity: number;

    @Column({ nullable: false })
    panel_image: string;

    @Column({ nullable: false })
    panel_model: string;

    @ManyToOne(() => Record, (record) => record.itemRecords)
    @JoinColumn()
    record: Record;
}