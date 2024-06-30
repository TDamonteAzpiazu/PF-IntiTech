import {  Column, Entity , OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";

import { Stats } from "./stats.entity";
import {  IsUUID } from "class-validator";
import { StatsDto } from "src/dto/stats.dto";
@Entity({name : "panelstats"})
export class OperatingPanels {

    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string = uuid()

    @OneToMany(() => Stats, stats => stats.operatingPanel)
    stats: Stats[];
}