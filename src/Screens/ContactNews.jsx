import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ContactNews.css";
import newsData from './newsData'; // Importa los datos de newsData.js

const ContactNews = () => {
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 6000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    draggable: false,
  });

  useEffect(() => {
    const updateSettings = () => {
      if (window.innerWidth <= 768) {
        setSettings({
          dots: true,
          infinite: true,
          speed: 6000,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          cssEase: 'linear',
          draggable: true,
        });
      } else {
        setSettings({
          dots: false,
          infinite: true,
          speed: 6000,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 0,
          cssEase: 'linear',
          draggable: false,
        });
      }
    };

    updateSettings();
    window.addEventListener('resize', updateSettings);

    return () => window.removeEventListener('resize', updateSettings);
  }, []);

  const handleLocationClick = () => {
    window.open('https://www.google.com/maps/place/Hospital+IV+Augusto+Hern%C3%A1ndez+Mendoza+EsSalud/@-14.066255,-75.7394389,17.68z/data=!4m6!3m5!1s0x9110e2c06b616717:0x63c6934f87d76da!8m2!3d-14.0655786!4d-75.7380884!16s%2Fg%2F1w0j0nx0?entry=ttu', '_blank', 'width=800,height=600');
  };

  return (
    <div>
      <section className="news-section">
        <h2>MEJOR INFORMACIÓN, MEJOR SALUD</h2>
        <h3>Noticias</h3>
        <div className="news-wrapper">
          <Slider {...settings} className="news-container">
            {newsData.map((news, index) => (
              <div key={index} className="news-card">
                <a href={news.link} target="_blank" rel="noopener noreferrer">
                  <div className="news-image">
                    <img src={news.image} alt="news" />
                    <div className="image-overlay">
                      <p>Ver noticia</p>
                    </div>
                  </div>
                </a>
                <div className="news-info">
                  <p>{news.date} | By {news.author}</p>
                  <h4>{news.title}</h4>
                  <div className="news-stats">
                    <span>👁️ {news.views}</span>
                    <span>❤️ {news.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="contact-section">
        <h2>GET IN TOUCH</h2>
        <h3>Contact</h3>
        <div className="contact-container">
          <div className="contact-card">
            <h4>EMERGENCY</h4>
            <p>(237) 681-812-255</p>
            <p>(237) 666-331-894</p>
          </div>
          <div className="contact-card" onClick={handleLocationClick} style={{ cursor: 'pointer' }}>
            <h4>LOCATION</h4>
            <p>Hospital IV Augusto Hernández Mendoza EsSalud</p>
            <p>Ica, Ica, Perú</p>
          </div>
          <div className="contact-card">
            <h4>EMAIL</h4>
            <p>fidelineeseo@gmail.com</p>
            <p>myebstudios@gmail.com</p>
          </div>
          <div className="contact-card">
            <h4>WORKING HOURS</h4>
            <p>Mon-Sat 09:00-20:00</p>
            <p>Sunday Emergency only</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactNews;
