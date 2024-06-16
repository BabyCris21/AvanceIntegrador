import React from 'react';
import '../footer/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h4>VITAL CARE</h4>
          <p>Liderando el camino en medicina<br></br>Excelencia, atención confiable</p>
        </div>

        <div className="footer-column">
          <h4>Contáctanos</h4>
          <ul>
            <li>Dirección: Calle Principal, Ciudad</li>
            <li>Teléfono: +123 456 789</li>
            <li>Email: info@tuempresa.com</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Noticias</h4>
          {/* Aquí puedes agregar noticias o enlaces relacionados */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
