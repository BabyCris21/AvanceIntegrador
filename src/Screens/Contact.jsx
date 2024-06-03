import React from 'react'
import ContactNews from './ContactNews';
import { Link } from 'react-router-dom'


const Contact = () => {
  return (
   <div className="home-container">
      <section className="home-top-section">
        <div className="home-company-info">
          <div className="company-info-container">
            <h1>VitalCare</h1>
            <p>Cuidamos tu salud<br />Líderes en la excelencia médica</p>
          </div>
          <button><Link to="/servicios" className="home-button-link">Nuestros servicios</Link></button>
        </div>
        <div className="home-button-container">
          <button><Link to="/reserva" className="home-button-link">Reserva una cita</Link></button>
          <button><Link to="/staff" className="home-button-link">Ver staff médico</Link></button>
          <button><Link to="/servicios" className="home-button-link">Servicios</Link></button>
        </div>
      </section>
      <ContactNews/>  
    </div>
  )
}

export default Contact
