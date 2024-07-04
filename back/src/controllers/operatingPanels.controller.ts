import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Inversor } from 'src/entities/inversor.entity';
import { OperatingPanelsService } from 'src/services/operatingPanels.service';

@Controller('panels')
export class OperatingPanelsController {
  constructor(private readonly operatingPanelsService: OperatingPanelsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File , @Body("inversorName") inversorName: string) {
    console.log("hola");
    
    if (!file) {
      throw new Error('No file uploaded');
    }

    try {
      const data = await this.operatingPanelsService.readExcel(file.buffer);
      
      const stats = await this.operatingPanelsService.extractData(data , inversorName);
      console.log(stats);
      
      return { message: 'File processed successfully', stats };
    } catch (error) {
      return { error: `Failed to process file: ${error.message}` };
    }
  }

  @Post('uploadSunnyPortal')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileSunnyPortal(@UploadedFile() file: Express.Multer.File , @Body("inversorName") inversorName: string) {
    console.log("hola");
    
    if (!file) {
      throw new Error('No file uploaded');
    }

    try {
      const data = await this.operatingPanelsService.readExcel(file.buffer);
      
      const stats = await this.operatingPanelsService.extractDataSunnyPortal(data , inversorName); ;
      
      return { message: 'File processed successfully', stats };
    } catch (error) {
      return { error: `Failed to process file: ${error.message}` };
    }
  }

  
  @Get()
  async getAllOperatingPanels() {
    return await this.operatingPanelsService.getAllOperatingPanels();
  }

  @Get(':id')
  async getOperatingPanelById(@Param('id') id: string) {
    return await this.operatingPanelsService.getOperatingPanelById(id);
  }
}

