import React, { useState } from 'react';
import './Perfil.css'; // Importa tus estilos CSS
import UsuarioInfo from '../UsuarioInfo';
import ContactNews from '../sliders/ContactNews'; // Importa el componente ContactNews
import ListaCita from '../ListaCita'; // Importa el componente ListaCita
import CitaDoctor from '../CitaDoctor';
import SeleccionarCita from '../SeleccionarCita'; // Importa el component


// Componente de la sección del panel de control
const ControlPanelSection = ({ section, onClick }) => {
    return (
        <button className="dashboard-button" onClick={() => onClick(section)}>
            {section}
        </button>
    );
};

// Componente de contenido de la sección actual
const CurrentSectionContent = ({ currentSection, setUserName }) => {
    switch (currentSection) {
        case 'Usuario':
            return <UsuarioInfo setUserName={setUserName} />;
        case 'Reserva':
            return <SeleccionarCita />;
        case 'Citas':
            return <ListaCita />;
        default:
            return null;
    }
};

const Perfil = () => {
    const [currentSection, setCurrentSection] = useState('Usuario');
    const [userName, setUserName] = useState('');

    const handleSectionChange = (section) => {
        setCurrentSection(section);
    };

    return (
        <div>
            <div className="profile-container">
                <div className="profile-header">
                    <img src="/paciente.png" alt="Paciente" className="paciente-icon" />
                    <h2>Perfil de Usuario</h2>
                    <span className="user-greeting">Hola, {userName.name}</span>
                </div>
                <div className="profile-content">
                    {/* Dashboard */}
                    <div className="dashboard">
                        <ControlPanelSection section="Usuario" onClick={handleSectionChange} />
                        <ControlPanelSection section="Reserva" onClick={handleSectionChange} />
                        <ControlPanelSection section="Citas" onClick={handleSectionChange} />
                    </div>
                    {/* Contenido de la sección */}
                    <div className="section-container">
                        <div className="section-content">
                            <CurrentSectionContent currentSection={currentSection} setUserName={setUserName} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Componente ContactNews colocado debajo del contenedor de perfil */}
            <ContactNews />
        </div>
    );
};

export default Perfil;
