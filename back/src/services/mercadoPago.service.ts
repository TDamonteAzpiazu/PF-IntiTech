import { Injectable } from '@nestjs/common';
import { preference } from 'src/config/mercadopago';
import { ItemDto } from 'src/dto/item.dto';

@Injectable()
export class MercadoPagoService {
  constructor() {}

  async createPreference(body: any) {
    
    const preferenceData = {
      items: body.items.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
      })),
      back_urls: {
        success: "https://pf-intitech.onrender.com/mercadopago/success",
        failure: "https://pf-intitech.onrender.com/mercadopago/failure",
      },
      auto_return: 'approved',
    };

    try {
      const response = await preference.create({body: preferenceData });
      return { preferenceId: response.id }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}