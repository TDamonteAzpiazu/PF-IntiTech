import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Inversor } from "./inversor.entity";
import { Stats } from "./stats.entity";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
@Entity({name : "panelstats"})
export class OperatingPanels {

    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string = uuid;

    @OneToMany(() => Inversor, (inversor) => inversor.operatingPanels)
    @IsString()
    @IsNotEmpty()
    inversor : string;

    @OneToMany(() => Stats, stats => stats.operatingPanel)
    stats: Stats[];
}