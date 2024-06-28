import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#dadada] text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Formulario */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-black h-8 w-64">Suscríbete</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-9/12 px-3 py-2 text-gray-900 rounded-xl"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-9/12 px-3 py-2 text-gray-900 rounded-xl"
                  placeholder="Tu email"
                />
              </div>
              <button type='submit' className="bg-lightorangeinti text-white mr-4 px-4 py-2 rounded-lg">
                Suscribirse
              </button>
            </form>
          </div>

          {/* Nuestros servicios */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-black h-8 w-64">Nuestros Servicios</h2>
            <ul>
              <li className="mb-2">Servicio 1</li>
              <li className="mb-2">Servicio 2</li>
              <li className="mb-2">Servicio 3</li>
              <li className="mb-2">Servicio 4</li>
            </ul>
          </div>

          {/* Contáctenos */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-black h-8 w-64">Contáctenos</h2>
            <p className="mb-2">Teléfono: (123) 456-7890</p>
            <p className="mb-2">Email: contacto@example.com</p>
            <p className="mb-2">Dirección: Calle Falsa 123, Ciudad, País</p>
          </div>

          {/* Imagen */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-black h-8 w-64">Encuentranos</h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.7251368142765!2d-70.58366331973544!3d-33.40433447097393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf250de7f841%3A0xf9f838a245f24075!2sAlonso%20de%20C%C3%B3rdova%2C%20Vitacura%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses-419!2sar!4v1719588903935!5m2!1ses-419!2sar" width="325" height="225"  loading="lazy" ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
