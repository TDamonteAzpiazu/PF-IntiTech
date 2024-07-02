// src/mercadopago/mercadopago.service.ts
import { Injectable } from '@nestjs/common';
import { Preference, MercadoPagoConfig } from 'mercadopago';

@Injectable()
export class MercadopagoService {
  private readonly backUrls = {
    success: process.env.MERCADOPAGO_BACK_URL_SUCCESS,
    failure: process.env.MERCADOPAGO_BACK_URL_FAILURE,
    pending: process.env.MERCADOPAGO_BACK_URL_PENDING,
  };

  private readonly preference: Preference;

  constructor() {
    const config = new MercadoPagoConfig({accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN});
    this.preference = new Preference(config);
  }

  async createPreference(items: any[], payer: any) {
    const preference = {
      items: items,
      payer: payer,
      back_urls: this.backUrls,
      auto_return: 'approved',
    };

    try {
      const response = await this.preference.create(preference);
      return response.body;
    } catch (error) {
      throw new Error(`Error creating preference: ${error.message}`);
    }
  }
}
