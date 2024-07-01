import React from 'react';

const About = () => {
    return (
        <div className="mt-24 bg-trasparent min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Sobre Nosotros</h1>
                        <p className="text-gray-700 mb-6">
                            Bienvenidos a nuestra empresa chilena especializada en la venta de paneles solares y servicios de limpieza para mantenerlos en óptimas condiciones. Nos enorgullece ofrecer soluciones sostenibles y eficientes para el aprovechamiento de la energía solar.
                        </p>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nuestros Servicios</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Limpieza Manual por Personal</h3>
                                <p className="text-gray-700">
                                    Nuestro equipo especializado de técnicos visita su ubicación para realizar una limpieza exhaustiva y cuidadosa de sus paneles solares, garantizando que operen con la máxima eficiencia.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Dispositivo Automático de Limpieza</h3>
                                <p className="text-gray-700">
                                    Ofrecemos un dispositivo automático que se encarga de la limpieza de los paneles solares de forma regular y sin intervención humana. Este dispositivo es fácil de instalar y mantener.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Robot Automatizado de Limpieza</h3>
                                <p className="text-gray-700">
                                    Nuestro robot automatizado utiliza tecnología avanzada para limpiar los paneles solares de manera eficiente y autónoma. Ideal para instalaciones grandes y de difícil acceso.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacta con Nosotros</h2>
                        <p className="text-gray-700">
                            Si tienes alguna pregunta o deseas más información sobre nuestros productos y servicios, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte a aprovechar al máximo la energía solar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
