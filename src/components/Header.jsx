import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const links = [
  {
    name: 'Clínica VitalCare',
    imgSrc: '/clinic.png', // Ruta relativa a la carpeta public
    href: '/clinica'
  },
  {
    name: 'Emergencia',
    imgSrc: '/call.png', // Ruta relativa a la carpeta public
    href: '/emergencia'
  },
  {
    name: 'Horarios',
    imgSrc: '/time.png', // Ruta relativa a la carpeta public
    href: '/horarios'
  },
  {
    name: 'Ubicacion',
    imgSrc: '/ubi.png', // Ruta relativa a la carpeta public
    href: '/ubicacion'
  },
  {
    imgSrc: '/user.png', // Ruta relativa a la carpeta public
    href: "/login"
  },
  {
    imgSrc: '/exit.png', // Ruta relativa a la carpeta public
    href: "/logout"
  },
];

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        {links.slice(0, links.length - 2).map(x => (
          <Link
            key={x.href}
            to={x.href}
            className="header-link"
          >
            <img src={process.env.PUBLIC_URL + x.imgSrc} alt={x.name} className="header-img" />
            {x.name && <span>{x.name}</span>}
          </Link>
        ))}
      </div>
      <div className="header-right">
        {links.slice(-2).map(x => (
          <Link to={x.href} key={x.href} className="cita-button">
            <img src={process.env.PUBLIC_URL + x.imgSrc} alt={x.name} className="header-img" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Header;
