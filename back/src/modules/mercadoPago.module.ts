import { Module } from '@nestjs/common';


@Module({
  imports: [MercadoPagoModule],
  controllers: [mercadoPagoController],
  providers: [mercadoPagoService , mercadoPagoRepository],
})
export class AppModule {}
