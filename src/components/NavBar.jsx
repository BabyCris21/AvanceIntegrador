// En NavBar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const links = [
  {
    name: 'Home',
    href: '/home'
  },
  {
    name: 'Staff',
    href: '/staff'
  },
  {
    name: 'Servicios',
    href: '/servicios'
  },
  {
    name: 'Contactanos',
    href: '/contact'
  },
  {
    name: 'Nosotros',
    href: '/nosotros'
  },
  {
    name: 'Reserva una cita', // Nuevo botón "Cita"
    href: '/cita'
  },
   
 
];

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        {links.slice(0, links.length - 1).map(x => (
          <Link
            key={x.href}
            to={x.href}
            className="navbar-link"
          >
            {x.name}
          </Link>
        ))}
      </div>
      <div className="navbar-right">
        <Link to={links[links.length - 1].href} className="cita-button">
          {links[links.length - 1].name}
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
