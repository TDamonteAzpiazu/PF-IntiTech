import { Injectable } from '@nestjs/common';
import { preference } from 'src/config/mercadopago';

@Injectable()
export class MercadoPagoService {
  constructor() {}

  async createPreference(body: any) {
    const preferenceData = {
      items: [
        {
          id: body.items[0].id ,
          title: body.items[0].title,
          quantity: body.items[0].quantity,
          unit_price: body.items[0].unit_price,
        },
      ],
    };

    try {
      console.log(body.items[0].title);
      const response = await preference.create({body: preferenceData });
      return { preferenceId: response.id }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}