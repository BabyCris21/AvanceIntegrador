import { Link } from "react-router-dom";
import ContactNews from './ContactNews';
import "./Servicios.css"

const Servicios = () => {
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
          <button><Link to="/Reserva" className="home-button-link">Reserva una cita</Link></button>
          <button><Link to="/Staff" className="home-button-link">Ver staff médico</Link></button>
          <button><Link to="/Nosotros" className="home-button-link">Acerca de nosotros</Link></button>
        </div>
      </section>

      <ContactNews/>  

    </div>
  )
}

export default Servicios
