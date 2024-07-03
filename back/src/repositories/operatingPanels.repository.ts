import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperatingPanels } from 'src/entities/operatingPanels.entity';
import { Stats } from 'src/entities/stats.entity'; // Asegúrate de importar la entidad correcta
import { StatsDto } from 'src/dto/stats.dto';
import * as moment from 'moment';
import { Inversor } from 'src/entities/inversor.entity';

const XLSX = require('xlsx');

@Injectable()
export class OperatingPanelsRepository {
  constructor(
    @InjectRepository(OperatingPanels)
    private readonly operatingPanelsRepository: Repository<OperatingPanels>,
    @InjectRepository(Stats) 
    private readonly statsRepository: Repository<Stats>,
    @InjectRepository(Inversor)
    private readonly inversorRepository: Repository<Inversor>,
  ) {}

  async readExcel(buffer: Buffer): Promise<string> {
    const workbook = XLSX.read(buffer, { type: 'buffer', raw: true });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const dataExcel = XLSX.utils.sheet_to_json(sheet);

    return dataExcel;
  }

  async extractData(data  , inversorName : string): Promise<StatsDto[]> {
    
    const stats: StatsDto[] = data.map((dato) => ({
      date: dato['dateTime'],
      energyGenerated: dato['pvGeneration(kWh)'],
    }));
    
    const arrayStats = [];

    for (const stat of stats) {
      const createdStats = this.statsRepository.save(stat);
      arrayStats.push(createdStats);
    }
    
    const inversor = await this.inversorRepository.findOneBy({ name : inversorName });
    if (!inversor) {
      throw new BadRequestException('Inversor does not exist');
    }
    const panelData = this.operatingPanelsRepository.create({
      stats: arrayStats,
      inversor: inversor
    });
    console.log(panelData);

    await this.operatingPanelsRepository.save(panelData);

    return stats;
  }

  async getAllOperatingPanels(): Promise<OperatingPanels[]> {
    try {
      const panels = this.operatingPanelsRepository.find();

      if (!panels) {
        throw new NotFoundException('No operating panels were found.');
      }

      return panels;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  async getOperatingPanelById(id : string): Promise<OperatingPanels> {
    return await this.operatingPanelsRepository.findOneBy({ id });
  }

  
}
