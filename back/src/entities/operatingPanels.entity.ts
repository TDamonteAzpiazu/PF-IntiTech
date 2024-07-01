import {  Column, Entity , ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";

import { Stats } from "./stats.entity";
import {  IsUUID } from "class-validator";
import { StatsDto } from "src/dto/stats.dto";
import { Inversor } from "./inversor.entity";
@Entity({name : "panelstats"})
export class OperatingPanels {

    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string = uuid()

    @OneToMany(() => Stats, stats => stats.operatingPanel)
    stats: Stats[];

    @ManyToOne(() => Inversor, inversor => inversor.operatingPanels)
    inversor: Inversor;
}