import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StatsDto } from 'src/dto/stats.dto';

import { Inversor } from 'src/entities/inversor.entity';
import { OperatingPanels } from 'src/entities/operatingPanels.entity';
import { Stats } from 'src/entities/stats.entity';
import { OperatingPanelsService } from 'src/services/operatingPanels.service';

@Controller('panels')
export class OperatingPanelsController {
  constructor(
    private readonly operatingPanelsService: OperatingPanelsService,
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('inversorName') inversorName: string,
  ): Promise<{ message: string; stats: StatsDto[] | string } | { error: string }> {
    

    if (!file) {
      throw new Error('No file uploaded');
    }

    
    try {
      const data = await this.operatingPanelsService.readExcel(file.buffer);
      console.log(data);
      
      const stats = await this.operatingPanelsService.extractDataByInversor(data, inversorName);

      return { message: 'File processed successfully', stats };
    } catch (error) {
      return { error: `Failed to process file: ${error.message}` };
    }
  }

  @Get()
  async getAllOperatingPanels(): Promise<OperatingPanels[]> {
    return await this.operatingPanelsService.getAllOperatingPanels();
  }

  @Get(':id')
  async getOperatingPanelById(@Param('id') id: string): Promise<OperatingPanels> {
    return await this.operatingPanelsService.getOperatingPanelById(id);
  }
}

