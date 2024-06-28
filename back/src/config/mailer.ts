import * as nodemailer from 'nodemailer';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

console.log('PASSWORD_APP:', process.env.PASSWORD_APP); // Verifica que la variable esté configurada

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'pablorodriguez6002@gmail.com',
    pass: process.env.PASSWORD_APP,
  },
});

transporter.verify().then(() => {
  console.log('ready for send emails');
});
