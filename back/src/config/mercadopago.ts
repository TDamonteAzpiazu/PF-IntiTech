import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { config as dotenvconfig } from 'dotenv';

dotenvconfig({ path: '.env' });

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
});
// console.log(client)
const preference = new Preference(client);
// console.log(preference)
const payment = new Payment(client);

export { preference, payment };