import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OperatingPanelsService } from 'src/services/operatingPanels.service';

@Controller('panels')
export class OperatingPanelsController {
  constructor(private readonly operatingPanelsService: OperatingPanelsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log("hola");
    
    if (!file) {
      throw new Error('No file uploaded');
    }

    try {
      const data = await this.operatingPanelsService.readExcel(file.buffer);
      
      const stats = await this.operatingPanelsService.extractData(data);
      console.log(stats);
      
      return { message: 'File processed successfully', stats };
    } catch (error) {
      return { error: `Failed to process file: ${error.message}` };
    }
  }
}

