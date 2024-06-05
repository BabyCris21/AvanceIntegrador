import React, { useState } from 'react';
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
    href: '/reserva'
  },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="navbar">
      <div className={`navbar-left ${menuOpen ? 'show' : ''}`}>
        {links.map(x => (
          <Link
            key={x.href}
            to={x.href}
            className="navbar-link"
            onClick={() => setMenuOpen(false)} // Cierra el menú al hacer clic en un enlace
          >
            {x.name}
          </Link>
        ))}
      </div>
      <div className={`menu-icon ${menuOpen ? 'hide' : ''}`} onClick={toggleMenu}>
        &#9776;
      </div>
    </div>
  );
}

export default NavBar;
