import * as nodemailer from 'nodemailer';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

console.log('PASSWORD_APP:', process.env.PASSWORD_APP); // Verifica que la variable esté configurada

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'pfintitech@gmail.com',
    pass: process.env.PASSWORD_APP,
  },
  //Esto de abajo hace q no rompa pero no es recomendable para producción
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify().then(() => {
  console.log('ready for send emails');
});
