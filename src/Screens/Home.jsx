import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import ContactNews from './ContactNews';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("Chequeo Gratis"); 
  const [showContent, setShowContent] = useState(true); 

  useEffect(() => {
    setShowContent(true); 
  }, []); 


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowContent(true);
  };

  

  const serviceInfo = {
    "Chequeo Gratis": {
      frase: "Obtenga tranquilidad sobre su salud con nuestro servicio de chequeo gratis. Nuestro equipo médico le ofrece una evaluación completa y sin costo para detectar posibles problemas de salud y promover su bienestar a largo plazo.",
      description:"El chequeo gratis es crucial en la actualidad para detectar problemas de salud en etapas tempranas, lo que permite intervenir antes de que se conviertan en afecciones graves. Proporciona a los pacientes una evaluación completa de su estado de salud sin costo, fomentando una mayor conciencia y cuidado preventivo.",
      items: [
        "Detección temprana de enfermedades.",
        "Prevención de complicaciones de salud.",
        "Ahorro de costos a largo plazo.",
        "Promoción de un estilo de vida saludable.",
        "Tranquilidad y seguridad para los pacientes.",
        "Acceso a orientación médica personalizada."
      ]
    },
    "Cardiograma": {
      frase: "Su corazón es el motor de su vida, y nuestro servicio de cardiograma está aquí para mantenerlo en óptimas condiciones. Con nuestra avanzada tecnología y experiencia médica, podemos evaluar su salud cardiovascular de manera precisa y ayudarlo a tomar medidas preventivas para un corazón más saludable.",
      description: "El cardiograma es una herramienta fundamental para evaluar la salud del corazón. Proporciona información vital sobre la función cardíaca, ayudando a detectar y tratar problemas cardíacos en etapas tempranas, lo que puede salvar vidas y mejorar la calidad de vida de los pacientes.",
      items: [
        "Diagnóstico preciso de enfermedades genéticas.",
        "Orientación en la toma de decisiones sobre salud y estilo de vida.",
        "Identificación de riesgos hereditarios para la salud.",
        "Personalización de tratamientos médicos.",
        "Confirmación de la paternidad",
        "Apoyo en la investigación médica y científica"
      ]
    },
    "Test de ADN": {
      frase: "Descubra los secretos de su genética con nuestra prueba de ADN. Nuestro servicio le brinda información invaluable sobre su predisposición genética a enfermedades, permitiéndole tomar decisiones informadas sobre su salud y estilo de vida.",
      description: "Las pruebas de ADN ofrecen una ventana única hacia la genética de un individuo, lo que permite diagnosticar enfermedades genéticas, identificar riesgos hereditarios y personalizar tratamientos médicos. Además, tienen aplicaciones en campos como la paternidad y la investigación científica.",
      items: [
        "Diagnóstico preciso de enfermedades genéticas.",
        "Identificación de riesgos hereditarios para la salud.",
        "Personalización de tratamientos médicos.",
        "Orientación en la toma de decisiones sobre salud y estilo de vida.",
        "Confirmación de la paternidad.",
        "Apoyo en la investigación médica y científica."
      ]
    },
    "Banco de Sangre": {
      frase: "Cuando se trata de emergencias médicas, tener acceso a un banco de sangre confiable puede marcar la diferencia entre la vida y la muerte. Nuestro banco de sangre proporciona un suministro vital para transfusiones, tratamientos y cirugías, garantizando que usted reciba la atención médica que necesita cuando más lo necesita.",
      description: "Los bancos de sangre desempeñan un papel crucial en la atención médica al proporcionar sangre y componentes sanguíneos para transfusiones, tratamientos y cirugías. Son esenciales para salvar vidas en emergencias, así como para el tratamiento de enfermedades crónicas y el avance de la medicina a través de la investigación.",
      items: [
        "Suministro de sangre para transfusiones.",
        "Soporte vital en emergencias y cirugías.",
        "Tratamiento de enfermedades crónicas.",
        "Ayuda a pacientes con trastornos de la coagulación.",
        "Apoyo a pacientes en quimioterapia y trasplantes.",
        "Contribución a la investigación médica y científica"
      ]
    }
  };

  const serviceImages = {
    "Chequeo Gratis": ["chequeo1.jpg", "chequeo2.webp"],
    "Cardiograma": ["cardio1.jpg", "cardio2.webp"],
    "Test de ADN": ["adn.jpeg", "adn2.jpg"],
    "Banco de Sangre": ["sangre.jpg", "sangre2.jpg"]
  };

  const contentClass = selectedOption && showContent ? 'show' : '';

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


      <section className="home-welcome-section">
        <h2 className="home-section-title">BIENVENIDO A</h2>
        <h1 className="home-main-title">Un gran lugar para recibir atención</h1>
        <p className="home-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.</p>
        <button className="home-learn-more-button">Leer más</button>
        <div className="home-image-banner">
          <img src="Captura.jpg" alt="Equipo de médicos" />
        </div>
      </section>

      <section className="home-services-section">
        <div className="home-services-list">
          <button className={`home-service-button ${selectedOption === "Chequeo Gratis" ? "selected-section" : ""}`} onClick={() => handleOptionClick("Chequeo Gratis")}>Chequeo Gratis</button>
          <button className={`home-service-button ${selectedOption === "Cardiograma" ? "selected-section" : ""}`} onClick={() => handleOptionClick("Cardiograma")}>Cardiograma</button>
          <button className={`home-service-button ${selectedOption === "Test de ADN" ? "selected-section" : ""}`} onClick={() => handleOptionClick("Test de ADN")}>Test de ADN</button>
          <button className={`home-service-button ${selectedOption === "Banco de Sangre" ? "selected-section" : ""}`} onClick={() => handleOptionClick("Banco de Sangre")}>Banco de Sangre</button>

          <button className="home-view-all-button">Ver todo</button>
        </div>

        {selectedOption && (
          <div className={`home-service-info ${contentClass}`}>
            <h1>{selectedOption}</h1>
            <h3 className="service-info-text">{serviceInfo[selectedOption].frase}</h3>
            <ul className="service-info-list">
              {serviceInfo[selectedOption].items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="service-info-description">{serviceInfo[selectedOption].description}</p>
          </div>
        )}

        {selectedOption && (
          <div className={`home-service-img ${contentClass}`}>
            <img src={serviceImages[selectedOption][0]} alt={`${selectedOption} - 1`} />
            <img src={serviceImages[selectedOption][1]} alt={`${selectedOption} - 2`} />
          </div>
        )}
      </section>

      <ContactNews/>
    </div>
  );
}

export default Home;
