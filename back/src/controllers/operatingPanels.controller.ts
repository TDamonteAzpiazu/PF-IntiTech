import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { GetAllOperatingPanelsSwagger, GetOperatingPanelByIdSwagger, UploadFileSwagger } from 'src/decorators/operatingPanels.decorator';
import { OperatingPanelsService } from 'src/services/operatingPanels.service';

@ApiTags('Operating Panels')
@Controller('panels')
export class OperatingPanelsController {
  constructor(private readonly operatingPanelsService: OperatingPanelsService) {}

  @Post('upload')
  @UploadFileSwagger()
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
  
  @Get()
  @GetAllOperatingPanelsSwagger()
  async getAllOperatingPanels() {
    return await this.operatingPanelsService.getAllOperatingPanels();
  }

  @Get(':id')
  @GetOperatingPanelByIdSwagger()
  async getOperatingPanelById(@Param('id') id: string) {
    return await this.operatingPanelsService.getOperatingPanelById(id);
  }
}

