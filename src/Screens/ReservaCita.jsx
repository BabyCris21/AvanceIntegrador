import React, { useState } from 'react';
import './Perfil.css'; // Importa tus estilos CSS
import SeleccionarCita from './SeleccionarCita'; // Importa el componente UsuarioInfo
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
        case 'Elige fecha y hora':
            return <SeleccionarCita/>
        case 'Detalles':
            return <div><p>Contenido de la sección Archivos</p></div>;
        case 'Finalizar':
            return <div><p>Contenido de la sección Archivos</p></div>;
        default:
            return null;
    }
};

const Perfil = () => {
    const [currentSection, setCurrentSection] = useState('Elige fecha y hora');
    const [userName, setUserName] = useState('');

    const handleSectionChange = (section) => {
        setCurrentSection(section);
    };

    return (
        <div>
            <div className="profile-container">
                <div className="profile-header">
                    <h2>Perfil de Usuario</h2>
                    <span className="user-greeting">Hola, {userName}</span>
                </div>
                <div className="profile-content">
                    {/* Dashboard */}
                    <div className="dashboard">
                        <ControlPanelSection section="Elige fecha y hora" onClick={handleSectionChange} />
                        <ControlPanelSection section="Detalles" onClick={handleSectionChange} />
                        <ControlPanelSection section="Finalizar" onClick={handleSectionChange} />
                    </div>
                    {/* Contenido de la sección */}
                    <div className="section-container">
                        <div className="section-content">
                            <CurrentSectionContent currentSection={currentSection} setUserName={setUserName} />
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <ContactNews />
        </div>
    );
};

export default Perfil;