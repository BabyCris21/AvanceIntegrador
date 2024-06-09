import React, { useState } from 'react';
import './PerfilDoctor.css'; // Importa tus estilos CSS
import DoctorInfo from './DoctorInfo'; // Importa el componente DoctorInfo
import ContactNews from './ContactNews'; // Importa el componente ContactNews

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
            return <DoctorInfo setUserName= {setUserName}/>;
        case 'Citas':
            return <div><p>Contenido de la sección Citas</p></div>;
        case 'Archivos':
            return <div><p>Contenido de la sección Archivos</p></div>;
        case 'Recetas':
            return <div><p>Contenido de la sección Recetas</p></div>;
        case 'Resultados':
            return <div><p>Contenido de la sección Resultados</p></div>;
        case 'Historial Medico':
            return <div><p>Contenido de la sección Historial Medico</p></div>;
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
                        <ControlPanelSection section="Archivos" onClick={handleSectionChange} />
                        <ControlPanelSection section="Recetas" onClick={handleSectionChange} />
                        <ControlPanelSection section="Resultados" onClick={handleSectionChange} />
                        <ControlPanelSection section="Historial Medico" onClick={handleSectionChange} />
                    </div>
                    {/* Contenido de la sección */}
                    <div className="section-content">
                        <CurrentSectionContent currentSection={currentSection} />
                    </div>
                </div>
            </div>
            {/* Componente ContactNews colocado debajo del contenedor de perfil */}
            <ContactNews />
        </div>
    );
};

export default PerfilDoctor;
