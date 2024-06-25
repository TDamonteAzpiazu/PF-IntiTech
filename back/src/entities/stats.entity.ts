import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OperatingPanels } from './operatingPanels.entity';


@Entity({name : "stats"})
export class Stats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    energyGenerated: number;

    @ManyToOne(() => OperatingPanels, operatingPanel => operatingPanel.stats)
    operatingPanel: OperatingPanels;
}