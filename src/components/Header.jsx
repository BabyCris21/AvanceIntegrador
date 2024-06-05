import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const links = [
  {
    name: 'Clínica VitalCare',
    imgSrc: '/clinic.png',
    href: '/clinica'
  },
  {
    name: 'Emergencia',
    imgSrc: '/call.png',
    href: '/emergencia'
  },
  {
    name: 'Horarios',
    imgSrc: '/time.png',
    href: '/horarios'
  },
  {
    name: 'Ubicacion',
    imgSrc: '/ubi.png',
    href: '/ubicacion'
  },
  {
    imgSrc: '/user.png',
    href: "/login"
  },
  {
    imgSrc: '/exit.png',
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
            {/* Mantenemos el texto solo para la vista normal */}
            <span className="header-text">{x.name}</span>
          </Link>
        ))}
      </div>
      <div className="header-right">
        {links.slice(-2).map(x => (
          <Link to={x.href} key={x.href} className="cita-button">
            <img src={process.env.PUBLIC_URL + x.imgSrc} alt={x.name} className="header-img" />
            {/* Mantenemos el texto solo para la vista normal */}
            <span className="header-text">{x.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Header;
