import { transporter } from 'src/config/mailer';
import { User } from 'src/entities/user.entity';

export async function sendWeeklyEmails(user: User): Promise<void> {
  await transporter.sendMail({
    from: '"Intitech" <pablorodriguez6002@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: 'Descubre las Novedades de Intitech!', // Subject line
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #FFA500;">¡Hola, <span style="color: #FFD700;">${user.name}</span>!</h2>
          <p>Nos enorgullece ofrecerte una amplia variedad de <strong>paneles solares</strong> de alta calidad, diseñados para maximizar la generación de energía y proporcionar una solución sostenible para tu hogar o negocio.</p>
          <p>Además, estamos emocionados de anunciar la nueva sección <strong>Dashboard</strong> en nuestra plataforma, exclusiva para usuarios administradores. Esta sección te permitirá monitorear en tiempo real los datos de generación de tus paneles solares, brindándote un control total sobre tu inversión.</p>
          <p>Nuestros innovadores <strong>robots limpiadores de paneles solares</strong> no solo ahorran tiempo y esfuerzo, sino que también te ayudan a generar más energía en menos tiempo y a ahorrar miles de litros de agua, contribuyendo así a la protección del medio ambiente.</p>
          <p>En Intitech, nos comprometemos a ofrecerte soluciones tecnológicas avanzadas que no solo sean eficientes sino también respetuosas con el medio ambiente.</p>
          <p>Recuerda que puedes cancelar las notificaciones en cualquier momento haciendo clic en el botón a continuación y visitando nuestra página web. En la sección inferior podrás cancelar todas tus notificaciones.</p>
          <a href="https://pf-inti-tech-umkv.vercel.app/" style="text-decoration: none;">
            <button style="background: linear-gradient(90deg, #FFD700, #FFA500); color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
              Cancelar Notificaciones
            </button>
          </a>
          <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo.</p>
          <p>¡Gracias por confiar en nosotros!</p>
          <p>El equipo de Intitech 🧡</p>
        </div>
        <style>
          a:hover button {
            cursor: pointer;
          }
        </style>
      `,
  });
}

export async function sendEmail(user: User, jwt: string): Promise<void> {
  await transporter.sendMail({
    from: '"Intitech" <pablorodriguez6002@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: 'Bienvenido a Intitech!', // Subject line
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #FFA500;">¡Gracias por registrarte, <span style="color: #FFD700;">${user.name}</span>!</h2>
          <p>Estamos emocionados de tenerte con nosotros. Nuestra empresa se dedica a ofrecer paneles solares y robots de alta calidad para la limpeieza de los mismos.</p>
          <p>Para completar tu registro, por favor haz clic en el siguiente botón:</p>
          <a href="https://pf-inti-tech-umkv.vercel.app/profile/activate" style="text-decoration: none;">
            <button style="background: linear-gradient(90deg, #FFD700, #FFA500); color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
              Activa tu cuenta
            </button>
          </a>
          <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo.</p>
          <p>¡Gracias!</p>
          <p>El equipo de Intitech 🧡</p>
        </div>
        <style>
          a:hover button {
            cursor: pointer;
          }
        </style>
      `, // html body
  });
}

export async function sendEmailWhenUserIsCreated(user: User): Promise<void> {
  await transporter.sendMail({
    from: '"Intitech" <pablorodriguez6002@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: 'Bienvenido a Intitech!', // Subject line
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #FFA500;">¡Gracias por registrarte, <span style="color: #FFD700;">${user.name}</span>!</h2>
          <p>Estamos emocionados de tenerte con nosotros. Nuestra empresa se dedica a ofrecer paneles solares y robots de alta calidad para la venta de los mismos.</p>
          <p>Para completar tu registro, por favor haz clic en el siguiente botón:</p>
          <a href="https://pf-inti-tech-umkv.vercel.app/profile/activate" style="text-decoration: none;">
            <button style="background: linear-gradient(90deg, #FFD700, #FFA500); color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
              Activa tu cuenta
            </button>
          </a>
          <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo.</p>
          <p>¡Gracias!</p>
          <p>El equipo de Intitech 🧡</p>
        </div>
        <style>
          a:hover button {
            cursor: pointer;
          }
        </style>
      `, // html body
  });
}
