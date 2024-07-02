import { Module } from '@nestjs/common';
import { MercadoPagoController } from 'src/controllers/mercadoPago.controller';
import { MercadoPagoService } from 'src/services/mercadoPago.service';

@Module({
  imports: [],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
})
export class MercadopagoModule {}
