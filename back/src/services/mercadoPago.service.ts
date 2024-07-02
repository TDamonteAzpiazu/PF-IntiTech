import { Injectable } from '@nestjs/common';

@Injectable()
export class MercadoPagoService {
  constructor() {}

  async createPreference(preference: any) {
    const preferenceData = {
      items: [
        {
          title: 'Mi producto',
          quantity: 1,
          unit_price: 2000,
        },
      ],
    };

    try {
      const response = await preference.create({ body: preferenceData });
      console.log(response);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}