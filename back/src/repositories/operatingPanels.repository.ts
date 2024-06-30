import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperatingPanels } from 'src/entities/operatingPanels.entity';
import { Stats } from 'src/entities/stats.entity'; // Asegúrate de importar la entidad correcta
import { StatsDto } from 'src/dto/stats.dto';
import * as moment from 'moment';


const XLSX = require('xlsx');

@Injectable()
export class OperatingPanelsRepository {
  constructor(
    @InjectRepository(OperatingPanels)
    private readonly operatingPanelsRepository: Repository<OperatingPanels>,
    @InjectRepository(Stats) // Añade la inyección del repositorio de Stats
    private readonly statsRepository: Repository<Stats>,
  ) {}

  async readExcel(buffer: Buffer) {
    const book = XLSX.read(buffer, { type: 'buffer' });
    const sheets = book.SheetNames;
    const sheet = sheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(book.Sheets[sheet]);
    return JSON.stringify(dataExcel, null, 2);
  }

  async extractData(data: string) {
    console.log('data');

    const parseData = JSON.parse(data);

    function excelSerialToDate(serial: number): Date {
      const excelEpoch = new Date('1899-12-30').getTime();
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const date = new Date(excelEpoch + serial * millisecondsPerDay);
      return date;
    }

    
    const stats: StatsDto[] = parseData.map((dato) => ({
      date: excelSerialToDate(dato['dateTime']),
      energyGenerated: dato['pvGeneration(kWh)'],
    }));

    // console.log(stats);

    // const createdStats = await this.statsRepository.save(stats.map(stat => this.statsRepository.create(stat)));

    const arrayStats = [];

    for (const stat of stats) {
      const createdStats = this.statsRepository.save(stat);
      arrayStats.push(createdStats);
    }

    const panelData = this.operatingPanelsRepository.create({
      stats: arrayStats,
    });
    console.log(panelData);

    await this.operatingPanelsRepository.save(panelData);
    

    return stats;
  }
}
