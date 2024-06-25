import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Inversor } from "./inversor.entity";
import { Stats } from "./stats.entity";
@Entity({name : "panelstats"})
export class OperatingPanels {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid;

    @OneToMany(() => Inversor, (inversor) => inversor.operatingPanels)
    inversor : string;

    @OneToMany(() => Stats, stats => stats.operatingPanel)
    stats: Stats[];
}