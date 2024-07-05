import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperatingPanels } from 'src/entities/operatingPanels.entity';
import { Stats } from 'src/entities/stats.entity';
import { StatsDto } from 'src/dto/stats.dto';
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

  async extractData(data, inversorName: string): Promise<StatsDto[]> {
    const stats: StatsDto[] = data.map((dato) => ({
      date: dato['dateTime'],
      energyGenerated: dato['pvGeneration(kWh)'],
    }));

    const arrayStats = [];

    for (const stat of stats) {
      const createdStats = this.statsRepository.save(stat);
      arrayStats.push(createdStats);
    }

    const inversor = await this.inversorRepository.findOneBy({
      name: inversorName,
    });
    if (!inversor) {
      throw new BadRequestException('Inversor does not exist');
    }
    const panelData = this.operatingPanelsRepository.create({
      stats: arrayStats,
      inversor: inversor,
    });

    await this.operatingPanelsRepository.save(panelData);

    return stats;
  }

  async extractDataSunnyPortal(
    data,
    inversorName: string,
  ): Promise<StatsDto[]> {
    const arrayStats: StatsDto[] = [];
    const updatedData = data.map((dato) => {
      const rawDate = dato['dateTime'] || dato[' '];
      const dateMatch = rawDate.match(/(\d{2})\/(\d{2})/);
      let date: Date | null = null;
      if (dateMatch) {
        const day = dateMatch[1];
        const month = dateMatch[2];
        const year = new Date().getFullYear(); // Asumiendo el año actual
        date = new Date(year, parseInt(month) - 1, parseInt(day));
      }

      const energyGenerated =
        dato['pvGeneration(kWh)'] ||
        dato[
          'SODIMAC HC NUEVA LA FLORIDA / Rendimiento total / Promedios [kWh]'
        ];
      const energyGeneratedNumber = energyGenerated
        ? parseFloat(energyGenerated.replace('.', '').replace(',', '.'))
        : 0;

      arrayStats.push({
        date: date,
        pvGeneration: energyGeneratedNumber,
      });
    });

    for (const stat of arrayStats) {
      const newStat = this.statsRepository.create({
        date: stat.date,
        energyGenerated: stat.pvGeneration,
      });

      await this.statsRepository.save(newStat);
    }

    const inversor = await this.inversorRepository.findOneBy({
      name: inversorName,
    });
    if (!inversor) {
      throw new BadRequestException('Inversor does not exist');
    }

    const panelData = this.operatingPanelsRepository.create({
      stats: arrayStats,
      inversor: inversor,
    });

    const savedPanelData = await this.operatingPanelsRepository.save(panelData);

    const stats = await this.statsRepository.find();

    for (const stat of stats) {
      stat.operatingPanel = savedPanelData
      await this.statsRepository.save(stat)
    }

    return arrayStats;
  }

  async getAllOperatingPanels(): Promise<OperatingPanels[]> {
    try {
      const panels = this.operatingPanelsRepository.find({relations : ['inversor','stats']});

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

  async getOperatingPanelById(id: string): Promise<OperatingPanels> {
    return await this.operatingPanelsRepository.findOneBy({ id });
  }
}
