import React, { useState } from 'react';
import './PerfilDoctor.css'; // Importa tus estilos CSS
import '../ReservaCita.css';
import DoctorInfo from '../DoctorInfo'; // Importa el componente DoctorInfo
import ContactNews from '../sliders/ContactNews'; // Importa el componente ContactNews
import ListaCita from '../CitaDoctor';
import CitaDoctor from '../CitaDoctor';

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
        case 'Perfil':
            return <DoctorInfo setUserName={setUserName} />;
        case 'Citas':
            return <CitaDoctor/>;
        default:
            return null;
    }
};

const PerfilDoctor = () => {
    const [currentSection, setCurrentSection] = useState('Perfil');
    const [userName, setUserName] = useState('');

    const handleSectionChange = (section) => {
        setCurrentSection(section);
    };

    return (
        <div>
            <div className="profile-container">
                <div className="profile-header">
                    <img src="/medico.png" alt="Medico" className="medico-icon" />
                    <h2>Perfil de Medico</h2>
                    <span className="user-greeting">Hola, {userName}</span>
                </div>
                <div className="profile-content">
                    {/* Dashboard */}
                    <div className="dashboard">
                        <ControlPanelSection section="Perfil" onClick={handleSectionChange} />
                        <ControlPanelSection section="Citas" onClick={handleSectionChange} />
                    </div>
                    {/* Contenido de la sección */}
                    <div className="section-content">
                        <CurrentSectionContent currentSection={currentSection} setUserName={setUserName} />
                    </div>
                </div>
            </div>
            {/* Componente ContactNews colocado debajo del contenedor de perfil */}
            <ContactNews />
        </div>
    );
};

export default PerfilDoctor;
