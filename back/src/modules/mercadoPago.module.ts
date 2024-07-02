// src/mercadopago/mercadopago.module.ts
import { Module } from '@nestjs/common';
import { MercadopagoController } from 'src/controllers/mercadoPago.controller';
import { MercadopagoService } from 'src/services/mercadoPago.service';


@Module({
  controllers: [MercadopagoController],
  providers: [MercadopagoService],
  exports: [MercadopagoService],
})
export class MercadopagoModule {}
