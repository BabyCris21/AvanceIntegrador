import React, { useState } from 'react';
import './Perfil.css'; // Importa tus estilos CSS
import SeleccionarCita from './SeleccionarCita'; // Importa el componente UsuarioInfo
import Paciente from './Paciente'; // Importa el componente
import ContactNews from './ContactNews'; // Importa el componente ContactNews
import ListaPaciente from './ListaPaciente';

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
            return <Paciente/>;
        case 'Finalizar':
            return <ListaPaciente/>;
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
                    <img src="/paciente.png" alt="Paciente" className="paciente-icon" />
                    <h2>Perfil de Usuario</h2>
                    <span className="user-greeting">Hola, {userName}</span>
                </div>
                <div className="profile-content">

                    <div className="dashboard-reserva">
                        <ControlPanelSection section="Elige fecha y hora" onClick={handleSectionChange} />
                        <ControlPanelSection section="Detalles" onClick={handleSectionChange} />
                        <ControlPanelSection section="Finalizar" onClick={handleSectionChange} />
                    </div>

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
