import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { OperatingPanels } from "./operatingPanels.entity";

@Entity('inversor')
export class Inversor {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({nullable : false})
    name: string

    @OneToMany(() => OperatingPanels, operatingPanels => operatingPanels.inversor)
    operatingPanels: OperatingPanels[]
}