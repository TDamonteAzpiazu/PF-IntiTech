import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperatingPanels } from 'src/entities/operatingPanels.entity';
import { Stats } from 'src/entities/stats.entity'; // Asegúrate de importar la entidad correcta
import { StatsDto } from 'src/dto/stats.dto';
import { Inversor } from 'src/entities/inversor.entity';
import { InversorsIngecon } from 'src/utils/inversorsIngecon';
import { InversorsSunnyPortal } from 'src/utils/inversorsSunnyPortal';

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
  ) { }

  async readExcel(buffer: Buffer): Promise<string> {
    const workbook: any = XLSX.read(buffer, { type: 'buffer', raw: true });
    const sheet: string = workbook.Sheets[workbook.SheetNames[0]];
    const dataExcel: string = XLSX.utils.sheet_to_json(sheet);

    return dataExcel;
  }

  async extractDataIngecon(data: any, inversorName: string): Promise<StatsDto[]> {
    const stats: StatsDto[] = data.map((dato: any) => ({
      date: dato['dateTime'],
      energyGenerated: dato['pvGeneration(kWh)'],
    }));

    const arrayStats: StatsDto[] = [];

    for (const stat of stats) {
      const createdStats = await this.statsRepository.save(stat);
      arrayStats.push(createdStats);
    }

    const inversor: Inversor = await this.inversorRepository.findOneBy({
      name: inversorName,
    });

    if (!inversor) {
      throw new BadRequestException('Inversor does not exist');
    }
    const panelData: OperatingPanels = this.operatingPanelsRepository.create({
      stats: arrayStats,
      inversor: inversor,
    });

    await this.operatingPanelsRepository.save(panelData);

    return stats;
  }

  async extractDataSunnyPortal(
    data: any,
    inversorName: string,
  ): Promise<StatsDto[]> {
    const arrayStats: StatsDto[] = [];
    const updatedData: any = data.map((dato) => {
      const rawDate: string = dato['dateTime'] || dato[' '];
      const dateMatch: RegExpMatchArray = rawDate.match(/(\d{2})\/(\d{2})/);
      let date: Date | null = null;
      if (dateMatch) {
        const day: string = dateMatch[1];
        const month: string = dateMatch[2];
        const year: number = new Date().getFullYear(); // Asumiendo el año actual
        date = new Date(year, parseInt(month) - 1, parseInt(day));
      }

      const energyGenerated =
        dato[
        'SODIMAC HC NUEVA LA FLORIDA / Rendimiento total / Promedios [kWh]'
        ];
      const energyGeneratedNumber: number = energyGenerated
        ? parseFloat(energyGenerated.replace('.', '').replace(',', '.'))
        : 0;

      arrayStats.push({
        date: date,
        pvGeneration: energyGeneratedNumber,
      });
    });


    for (const stat of arrayStats) {
      const newStat: Stats = this.statsRepository.create({
        date: stat.date,
        energyGenerated: stat.pvGeneration,
      });

      await this.statsRepository.save(newStat);
    }

    const inversor: Inversor = await this.inversorRepository.findOneBy({
      name: inversorName,
    });
    if (!inversor) {
      throw new BadRequestException('Inversor does not exist');
    }

    const panelData: OperatingPanels = this.operatingPanelsRepository.create({
      stats: arrayStats,
      inversor: inversor,
    });

    const savedPanelData: OperatingPanels = await this.operatingPanelsRepository.save(panelData);

    const stats: Stats[] = await this.statsRepository.find();

    for (const stat of stats) {
      stat.operatingPanel = savedPanelData;
      await this.statsRepository.save(stat);
    }

    return arrayStats;
  }

  async extracDataByInversor(
    data: any,
    inversorName: string
  ): Promise<StatsDto[]> {


    for (const inversor of InversorsIngecon) {

      if (inversor.name === inversorName) {

        return this.extractDataIngecon(data, inversorName);
      }
    }

    for (const inversor of InversorsSunnyPortal) {
      if (inversor.name === inversorName) {
        return this.extractDataSunnyPortal(data, inversorName);
      }
    }

  }

  async getAllOperatingPanels(): Promise<OperatingPanels[]> {
    try {
      const panels = this.operatingPanelsRepository.find({
        relations: ['inversor', 'stats'],
      });

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
    return await this.operatingPanelsRepository.findOne({ where: { id: id }, relations: ["inversor", "stats"] });
  }
}