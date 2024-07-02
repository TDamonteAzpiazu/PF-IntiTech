// src/mercadopago/mercadopago.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MercadopagoService } from 'src/services/mercadoPago.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {}

  @Post('create_preference')
  async createPreference(@Body() createPreferenceDto: CreatePreferenceDto) {
    const { items, payer } = createPreferenceDto;
    return await this.mercadopagoService.createPreference(items, payer);
  }
}
