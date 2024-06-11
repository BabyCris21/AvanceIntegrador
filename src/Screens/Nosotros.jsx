import React from 'react';
import "./Nosotros.css";

const Nosotros = () => {
  return (
    <div className="nosotros-container">
      <div className="section">
        <h2 className="section-heading">Nuestra Clínica</h2>
        <div className="section-content">
          <p>¡Bienvenido a nuestra clínica! Somos un equipo dedicado a proporcionar atención médica de calidad a nuestra comunidad. Aquí en nuestra clínica, nos enorgullece ofrecer una amplia gama de servicios médicos para satisfacer las necesidades de nuestros pacientes.</p>
          <p>Nuestra historia se remonta a 2002 , cuando Juan Perez y Maria Gonzalez establecieron esta clínica con la visión de proporcionar atención médica accesible y compasiva para todos. Desde entonces, hemos crecido y expandido nuestros servicios, pero nuestro compromiso con la excelencia médica y el cuidado del paciente sigue siendo el mismo.</p>
          <p>En nuestra clínica, nos esforzamos por crear un ambiente acogedor y de apoyo para nuestros pacientes. Nuestro equipo de médicos, enfermeras y personal administrativo está aquí para ayudarlo en cada paso del camino y garantizar que reciba el mejor cuidado posible.</p>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-heading">Misión y Visión</h2>
        <div className="section-content">
          <p><strong>Misión:</strong> Nuestra misión es proporcionar atención médica compasiva y de calidad, centrada en el paciente, que mejore la salud y el bienestar de nuestra comunidad.</p>
          <p><strong>Visión:</strong> Nos esforzamos por ser líderes en la entrega de servicios de salud integrales y accesibles, reconocidos por nuestra excelencia clínica, innovación y compromiso con el cuidado del paciente.</p>
        </div>
      </div>

      <div className="section">
        <h2 className="section-heading">Nuestro Equipo</h2>
        <div className="section-content equipo">
          <div className="miembro-equipo">
            <img className="miembro-imagen" src="doctorjuan.jpg" alt="Dr. Juan Pérez" />
            <div className="miembro-info">
              <h4>Dr. Juan Pérez</h4>
              <p>Médico de familia</p>
            </div>
          </div>
          <div className="miembro-equipo">
            <img className="miembro-imagen" src="enfermeramaria.jpg" alt="Enfermera María González" />
            <div className="miembro-info">
              <h4>Enfermera María González</h4>
              <p>Enfermera Jefe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nosotros;
