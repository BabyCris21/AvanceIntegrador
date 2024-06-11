import React from 'react';
import { Link } from 'react-router-dom';
import './Servicios.css';

const services = [
  {
    id: 1,
    title: 'Chequeo Gratuito',
    description: 'Aprovecha nuestro chequeo gratuito para mantenerte al tanto de tu salud general. Nuestros profesionales realizarán un examen básico para detectar posibles problemas de salud.',
    imageUrl: '/chequeo1.jpg', // Replace with actual image path
  },
  {
    id: 2,
    title: 'Consulta General',
    description: 'Recibe atención médica integral con nuestras consultas generales. Nuestros médicos te ayudarán a resolver cualquier duda o problema de salud que puedas tener.',
    imageUrl: '/consulta.jpg', // Replace with actual image path
  },
  {
    id: 3,
    title: 'Atención Pediátrica',
    description: 'Nuestros especialistas en pediatría están aquí para cuidar de la salud de tus hijos, ofreciendo revisiones y tratamientos específicos para los más pequeños.',
    imageUrl: '/pediatra.jpg', // Replace with actual image path
  },
  {
    id: 4,
    title: 'Atención Ginecológica',
    description: 'Ofrecemos servicios de ginecología para el cuidado de la salud femenina, incluyendo revisiones periódicas, asesoramiento y tratamientos específicos.',
    imageUrl: '/gineco.jpg', // Replace with actual image path
  },
  {
    id: 5,
    title: 'Nutrición y Dietética',
    description: 'Nuestros nutricionistas te ayudarán a alcanzar tus objetivos de salud mediante planes de alimentación personalizados y asesoramiento dietético.',
    imageUrl: '/nutricion.jpg', // Replace with actual image path
  },
  {
    id: 6,
    title: 'Fisioterapia',
    description: 'Recupera tu movilidad y mejora tu calidad de vida con nuestras sesiones de fisioterapia, diseñadas para tratar lesiones y condiciones crónicas.',
    imageUrl: '/fisio.jpg', // Replace with actual image path
  },
  {
    id: 7,
    title: 'Salud Mental',
    description: 'Nuestro equipo de psicólogos y psiquiatras está aquí para apoyarte en el cuidado de tu salud mental, ofreciendo terapia y asesoramiento.',
    imageUrl: '/mental.jpg', // Replace with actual image path
  },
  {
    id: 8,
    title: 'Vacunación',
    description: 'Mantén tus vacunas al día y protege tu salud con nuestros servicios de vacunación, disponibles para niños y adultos.',
    imageUrl: '/vacuna.jpg', // Replace with actual image path
  },
  {
    id: 9,
    title: 'Atención Odontológica',
    description: 'Cuidamos tu salud bucal con nuestros servicios de odontología, que incluyen limpiezas, tratamientos y revisiones periódicas.',
    imageUrl: '/odonto.jpg', // Replace with actual image path
  },
  {
    id: 10,
    title: 'Emergencias Médicas',
    description: 'Estamos disponibles para atender emergencias médicas con rapidez y eficiencia, asegurando que recibas la atención que necesitas cuando más lo necesitas.',
    imageUrl: '/emer.jpg', // Replace with actual image path
  }
];

const Servicios = () => {
  return (
    <div className="services-container">
      <h2>Nuestros Servicios</h2>
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <img src={service.imageUrl} alt={service.title} className="service-image"/>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;
