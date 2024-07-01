import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { OperatingPanels } from "./operatingPanels.entity";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@Entity('inversor')
export class Inversor {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string = uuid()

    @Column({nullable : false})
    @IsString()
    @IsNotEmpty()
    name: string

    @OneToMany(() => OperatingPanels, operatingPanels => operatingPanels.inversor)
    operatingPanels: OperatingPanels[]
}