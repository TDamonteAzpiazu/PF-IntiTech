import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { v4 as uuid } from 'uuid';
  import { OperatingPanels } from './operatingPanels.entity';
  import { ApiProperty } from '@nestjs/swagger';
  import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
  
  @Entity({ name: 'stats' })
  export class Stats {
    @ApiProperty({
      description: 'The unique identifier of the stats record',
      example: 'a9fbc123-12ab-4cd5-6ef7-8ab9cd0e1f23',
    })
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string = uuid()

 
    @ApiProperty({
      description: 'The date and time when the stats were recorded',
      example: '2024-07-01T12:00:00Z',
      type: 'string',
      format: 'date-time',}) 
    @Column({ type: 'timestamp', nullable: true })
    @IsDate()
    date: Date;
  
    @ApiProperty({
      description: 'The amount of energy generated, measured in kilowatt-hours (kWh)',
      example: 123.45,
    })
    @Column({ type: 'numeric', nullable: true})
    @IsNumber()
    energyGenerated: number;
  
    @ApiProperty({
      description: 'The operating panel associated with these stats',
      type: () => OperatingPanels,
    })
    @ManyToOne(() => OperatingPanels, (operatingPanel) => operatingPanel.stats)
    operatingPanel: OperatingPanels;
  }
  
