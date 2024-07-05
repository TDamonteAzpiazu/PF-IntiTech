
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inversor } from 'src/entities/inversor.entity';
import { Repository } from 'typeorm';
import { InversorsIngecon } from 'src/utils/inversorsIngecon';
import { InversorsSunnyPortal } from 'src/utils/inversorsSunnyPortal';

@Injectable()
export class InversorRepository implements OnModuleInit {

  constructor(
    @InjectRepository(Inversor)
    private readonly inversorRepository: Repository<Inversor>,
  ) {}

  async onModuleInit(): Promise<void> {
    const inversors = await this.inversorRepository.find();

    if (inversors.length === 0) {

      const inversorsIngecon = InversorsIngecon;
      for (const inversor of inversorsIngecon) {
        await this.inversorRepository.save(inversor);
      }
      const inversorsSunnyPortal = InversorsSunnyPortal;
      for (const inversor of inversorsSunnyPortal) {
        await this.inversorRepository.save(inversor);
      }
    }
   }
  }