import { Body, Controller, Post } from '@nestjs/common';
import { MercadoPagoService } from 'src/services/mercadoPago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post()
  createOrder(@Body() body: any) {
    return this.mercadoPagoService.createPreference(body);
  }
}