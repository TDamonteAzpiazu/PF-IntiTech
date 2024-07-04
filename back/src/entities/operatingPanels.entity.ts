import {
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { v4 as uuid } from 'uuid';
  import { Stats } from './stats.entity';
  import { Inversor } from './inversor.entity';
  import { ApiProperty } from '@nestjs/swagger';
  import { IsUUID } from 'class-validator';
  
  @Entity({ name: 'operatingpanels' })
  export class OperatingPanels {
    @ApiProperty({
      description: 'The id of the operating panel',
      example: 'a9fbc123-12ab-4cd5-6ef7-8ab9cd0e1f23',
    })
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string = uuid();
  
    @ApiProperty({
      description: 'The stats associated with this operating panel',
      type: () => [Stats],
    })
    @OneToMany(() => Stats, (stats) => stats.operatingPanel)
    stats: Stats[];
  
    @ApiProperty({
      description: 'The inversor associated with this operating panel',
      type: () => Inversor,
    })
    @ManyToOne(() => Inversor, (inversor) => inversor.operatingPanels)
    inversor: Inversor;
  }
  