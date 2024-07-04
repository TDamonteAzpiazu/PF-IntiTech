import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { v4 as uuid } from 'uuid';
  import { Record } from './record.entity';
  import { ApiProperty } from '@nestjs/swagger';
  import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
  
  @Entity('itemrecord')  // Asegúrate de que el nombre coincide con tu base de datos
  export class ItemRecord {
    @ApiProperty({
      description: 'The id of the item record',
      example: 'a9fbc123-12ab-4cd5-6ef7-8ab9cd0e1f23',
    })
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string = uuid();
  
    @ApiProperty({
      description: 'The total price of the item record',
      example: 49.99,
    })
    @Column()
    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;
  
    @ApiProperty({
      description: 'The ID of the panel associated with the item record',
      example: 'b1d3d4b2-0a7c-4f9e-abc6-7d01234e56f7',
    })
    @Column({ nullable: false })
    @IsUUID()
    @IsNotEmpty()
    panel_id: string;
  
    @ApiProperty({
      description: 'The quantity of the panel in the item record',
      example: 3,
    })
    @Column({ nullable: false })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
  
    @ApiProperty({
      description: 'The image URL of the panel associated with the item record',
      example: 'https://example.com/image.jpg',
    })
    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    panel_image: string;
  
    @ApiProperty({
      description: 'The model name of the panel associated with the item record',
      example: 'Model Y',
    })
    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    panel_model: string;
  
    @ApiProperty({
      description: 'The record associated with this item record',
      type: () => Record,
    })
    @ManyToOne(() => Record, (record) => record.itemRecords)
    @JoinColumn()
    @IsNotEmpty()
    record: Record;
  }
  