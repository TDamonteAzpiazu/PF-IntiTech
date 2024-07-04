import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { OperatingPanels } from './operatingPanels.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@Entity('inversor')
export class Inversor {
  @ApiProperty({
    description: 'The id of the inversor',
    example: 'd9d26b0a-90f4-4d30-bb44-cf61f3d3a58d',
  })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty({
    description: 'The name of the inversor',
    example: 'Inversor A',
  })
  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The operating panels associated with this inversor',
    type: () => [OperatingPanels],
  })
  @OneToMany(() => OperatingPanels, (operatingPanels) => operatingPanels.inversor)
  operatingPanels: OperatingPanels[];
}
