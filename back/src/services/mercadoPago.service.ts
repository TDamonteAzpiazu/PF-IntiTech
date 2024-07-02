import { Injectable } from '@nestjs/common';
import { preference } from 'src/config/mercadopago';

@Injectable()
export class MercadoPagoService {
  constructor() {}

  async createPreference(body: any) {
    const preferenceData = {
      items: [
        {
          id: '1',
          title: 'Mi producto',
          quantity: 1,
          unit_price: 2000,
        },
      ],
    };

    try {
      const response = await preference.create({body: preferenceData });
      return { preferenceId: response.id }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}