import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OperatingPanels } from './operatingPanels.entity';
import {v4 as uuid} from "uuid";
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

@Entity({name : "stats"})
export class Stats {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string = uuid()

    @Column({ type: 'timestamp' , nullable: true})
    @IsDate()
    date: Date;

    @Column({ type: 'numeric' , nullable: true})
    @IsNumber()
    @IsNotEmpty()
    energyGenerated: number;

    @ManyToOne(() => OperatingPanels, operatingPanel => operatingPanel.stats)
    operatingPanel: OperatingPanels;
}