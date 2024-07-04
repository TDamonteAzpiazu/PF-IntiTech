import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { v4 as uuid } from 'uuid';
  import { ItemRecord } from './itemRecord.entity';
  import { User } from './user.entity';
  import { ApiProperty } from '@nestjs/swagger';
  import { IsUUID, IsNumber, IsNotEmpty } from 'class-validator';
  
  @Entity('record')  // Añadido nombre para la tabla, ajusta si es necesario
  export class Record {
    @ApiProperty({
      description: 'The id of the record',
      example: 'e2e68e4d-91b3-4a8d-b9d8-43eb92f9c4e8',
    })
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string = uuid();
  
    @ApiProperty({
      description: 'The total price associated with the record',
      example: 250.75,
    })
    @Column()
    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;
  
    @ApiProperty({
      description: 'The user associated with the record',
      type: () => User,
    })
    @ManyToOne(() => User, (user) => user.records)
    @JoinColumn()
    @IsNotEmpty()
    user: User;
  
    @ApiProperty({
      description: 'The item records associated with this record',
      type: () => [ItemRecord],
    })
    @OneToMany(() => ItemRecord, (itemRecord) => itemRecord.record)
    @IsNotEmpty()
    itemRecords: ItemRecord[];
  }
  