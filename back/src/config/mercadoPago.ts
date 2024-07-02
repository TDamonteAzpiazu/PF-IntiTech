import { MercadoPagoConfig, Payment } from 'mercadopago';
import { config as dotenvConfig } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenvConfig({ path: '.env' });
// Step 2: Initialize the client object
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: uuidv4() } });

// Step 3: Initialize the API object
const payment = new Payment(client);

// Step 4: Create the request object
const body = {
	transaction_amount: 12.34,
	description: 'pablo gil',
	payment_method_id: '<PAYMENT_METHOD_ID>',
	payer: {
		email: 'benjadelcampo15@gmail.com',
	},
};

// Step 5: Create request options object - Optional
const requestOptions = {
	idempotencyKey: '<IDEMPOTENCY_KEY>',
};

// Step 6: Make the request
payment.create({ body, requestOptions }).then(console.log).catch(console.log);
