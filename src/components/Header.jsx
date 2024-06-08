import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const clearToken = () => {
    localStorage.removeItem('token');
  };

  const handleLocationClick = (e) => {
    e.preventDefault();
    const googleMapsUrl = 'https://www.google.com/maps/place/Hospital+IV+Augusto+Hern%C3%A1ndez+Mendoza+EsSalud/@-14.066255,-75.7394389,17.68z/data=!4m6!3m5!1s0x9110e2c06b616717:0x63c6934f87d76da!8m2!3d-14.0655786!4d-75.7380884!16s%2Fg%2F1w0j0nx0?entry=ttu';
    window.open(googleMapsUrl, '_blank', 'width=800,height=600');
  };

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
      imgSrc: '/user.png',
      href: "/login"
    },
    {
      imgSrc: '/exit.png',
      href: "/home",
      onClick: clearToken
    },
  ];

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
            <span className="header-text">{x.name}</span>
          </Link>
        ))}
        <div
          className="header-link"
          onClick={handleLocationClick}
          style={{ cursor: 'pointer' }}
        >
          <img src={process.env.PUBLIC_URL + '/ubi.png'} alt='Ubicacion' className="header-img" />
          <span className="header-text">Ubicacion</span>
        </div>
      </div>
      <div className="header-right">
        {links.slice(-2).map(x => (
          <Link to={x.href} key={x.href} className="cita-button" onClick={x.onClick}>
            <img src={process.env.PUBLIC_URL + x.imgSrc} alt={x.name} className="header-img" />
            <span className="header-text">{x.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
