import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inversor } from 'src/entities/inversor.entity';
import { Repository } from 'typeorm';
import { Inversors } from 'src/utils/inversors';

@Injectable()
export class InversorRepository implements OnModuleInit {

  constructor(
    @InjectRepository(Inversor)
    private readonly inversorRepository: Repository<Inversor>,
  ) {}

  async onModuleInit(): Promise<void> {
    const inversors = await this.inversorRepository.find();

    if (inversors.length === 0) {
      for (const inversor of Inversors) {
        await this.inversorRepository.save(inversor);
      }
    }
  }
}