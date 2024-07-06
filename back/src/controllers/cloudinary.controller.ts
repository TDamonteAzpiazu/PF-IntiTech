/* eslint-disable prettier/prettier */

import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UploadPanelImageSwagger, UploadUserImageSwagger } from 'src/decorators/cloudinary.decorator';
import { PanelForSale } from 'src/entities/panelForSale.entity';
import { User } from 'src/entities/user.entity';
import { CloudinaryService } from 'src/services/cloudinary.service';
import { PanelForSaleService } from 'src/services/panelForSale.service';
import { UserService } from 'src/services/user.service';

@ApiTags('Cloudinary')
@Controller('files')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UserService,
    private readonly panelForSaleService: PanelForSaleService
  ) { }

  @Post('uploadUserImage/:id')
  @UploadUserImageSwagger()
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        // Validación del tipo de archivo
        validators: [
          new MaxFileSizeValidator({
            maxSize: 20000000000000, // 200KB

            message: 'El tamaño máximo es de 200000KB',
          }),
          new FileTypeValidator({ fileType: /.(jpg|jpeg|png|gif|webp|avif)$/ }), // Validación del tipo de archivo
        ],
      }),
    )
    file: Express.Multer.File, // Validación del archivo , lo bautizo como FILE a lo que recibo por body(parametro)
  ): Promise<User> {
    await this.userService.getUserById(id);
    const image = await this.cloudinaryService.uploadImage(file);
    return await this.userService.updateUser(id, { image: image.url });
  }


  @Post('uploadPanelImage/:id')
  @UploadPanelImageSwagger()
  @UseInterceptors(FileInterceptor('file'))
  async uploadPanelImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        // Validación del tipo de archivo
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000000, // 200KB

            message: 'El tamaño máximo es de 200KB',
          }),
          new FileTypeValidator({ fileType: /.(jpg|jpeg|png|gif|webp|avif)$/ }), // Validación del tipo de archivo
        ],
      }),
    )
    file: Express.Multer.File, // Validación del archivo , lo bautizo como FILE a lo que recibo por body(parametro)
  ): Promise<PanelForSale> {
    await this.panelForSaleService.getPanelForSaleById(id);
    const image = await this.cloudinaryService.uploadImage(file);
    return await this.panelForSaleService.updatePanelForSale(id, { image: image.url });
  }

}
