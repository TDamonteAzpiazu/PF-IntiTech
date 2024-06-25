import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Inversor } from "./inversor.entity";
import { panelStatsDto } from "src/dtos/panelStats.dto";
@Entity({name : "panelstats"})
export class OperatingPanels {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid;

    @Column({nullable : false})
    stats : panelStatsDto[];

    @OneToMany(() => Inversor, (inversor) => inversor.operatingPanels)
    inversor : string;

}
   
