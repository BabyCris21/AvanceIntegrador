import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";

const Perfil = () => {
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
      description: "El chequeo gratis es crucial para detectar problemas de salud en etapas tempranas, lo que permite intervenir antes de que se conviertan en afecciones graves. Proporciona a los pacientes una evaluación completa de su estado de salud sin costo, fomentando una mayor conciencia y cuidado preventivo.",
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
      <section className="pefil-section">
        <div className="perfil-options-list">
          <button className={`home-service-button ${selectedOption === "Perfil" ? "selected-section" : ""}`} onClick={() => handleOptionClick("Chequeo Gratis")}>  Perfil</button>
          <button className={`home-service-button ${selectedOption === "Citas" ? "selected-section" : ""}`} onClick={() => handleOptionClick("Cardiograma")}>Citas</button>
          <button className={`home-service-button ${selectedOption === "Archivos" ? "selected-section" : ""}`} onClick={() => handleOptionClick("Test de ADN")}>Archivos</button>
          <button className={`home-service-button ${selectedOption === "Recetas" ? "selected-section" : ""}`} onClick={() => handleOptionClick("Recetas")}>Recetas</button>
          <button className={`home-service-button ${selectedOption === "Resultados" ? "selected-section" : ""}`} onClick={() => handleOptionClick("Resultados")}>Resultados</button>
          <button className={`home-service-button ${selectedOption === "Historial médico" ? "selected-section" : ""}`} onClick={() => handleOptionClick("Historial médico")}>Historial médico</button>


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
  );
}

export default Perfil;
