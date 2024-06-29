import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OperatingPanels } from './operatingPanels.entity';
import {v4 as uuid} from "uuid";
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

@Entity({name : "stats"})
export class Stats {
    @PrimaryGeneratedColumn()
    @IsUUID()
    id: uuid;

    @Column()
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    energyGenerated: number;

    @ManyToOne(() => OperatingPanels, operatingPanel => operatingPanel.stats)
    operatingPanel: OperatingPanels;
}