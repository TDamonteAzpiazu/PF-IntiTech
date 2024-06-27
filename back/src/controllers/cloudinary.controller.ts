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
import { CloudinaryService } from 'src/services/cloudinary.service';
import { UserService } from 'src/services/user.service';

@Controller('files')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly usersService: UserService,
  ) {}

  @Post('uploadUserImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
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
  ) {
    await this.usersService.getUserById(id);
    const image = await this.cloudinaryService.uploadImage(file);
    return await this.usersService.updateUser(id, { image: image.url });
  }
}
