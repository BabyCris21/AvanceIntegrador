import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservaCita.css';

const ReservaCita = () => {
  // Obtener la fecha actual
  const fechaActual = new Date();
  // Estado para almacenar la fecha seleccionada
  const [fecha, setFecha] = useState(fechaActual);

  // Estado para almacenar el horario seleccionado
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  // Función para manejar el cambio de fecha
  const handleFechaChange = (date) => {
    setFecha(date);
    setHorarioSeleccionado(null); // Reiniciar la selección de horario al cambiar la fecha
  };

  // Función para obtener el día de la semana (0: domingo, 1: lunes, ..., 6: sábado)
  const obtenerDiaSemana = (date) => {
    return date.getDay();
  };

  // Array de horarios disponibles
  const horariosDisponibles = [
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
  ];

  // Función para verificar si un horario es elegible
  const esHorarioElegible = (horario) => {
    const diaSemana = obtenerDiaSemana(fecha);

    // Verificar restricciones para los días
    switch (diaSemana) {
      case 6: // Sábado
        return (
          horario === '07:00 AM' ||
          horario === '08:00 AM' ||
          horario === '09:00 AM' ||
          horario === '10:00 AM' ||
          horario === '11:00 AM' ||
          horario === '12:00 PM' ||
          horario === '01:00 PM' ||
          horario === '02:00 PM'
        );
      case 0: // Domingo
        return (
            horario === '07:00 AM' ||
            horario === '08:00 AM' ); // Solo se puede seleccionar el horario de las 8:00 AM
      default:
        return true; // Para los demás días, todos los horarios son elegibles
    }
  };

  return (
    <div className="contenedor-80">
      {/* Primera parte */}
      <div className="parte">
        <h3>Selecciona:</h3>
        <div className="campo">
          <label htmlFor="especialidad">Especialidad:</label>
          <select name="especialidad" id="especialidad">
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
        </div>
        <div className="campo">
          <label htmlFor="area">Área:</label>
          <select name="area" id="area">
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
        </div>
        <div className="campo">
          <label htmlFor="profesional">Elige Profesional:</label>
          <select name="profesional" id="profesional">
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
        </div>
      </div>

      {/* Segunda parte */}
      <div className="parte">
        <h3>Selecciona la fecha:</h3>
        {/* Calendario */}
        <DatePicker
          selected={fecha}
          onChange={handleFechaChange}
          minDate={fechaActual}
          inline // Esto hace que el calendario esté siempre visible
        />
      </div>

      {/* Tercera parte */}
      <div className="parte">
        <h3>Selecciona horario:</h3>
        <div className="horarios-container">
          {horariosDisponibles.map((horario, index) => (
            <button
              key={index}
              className={horario === horarioSeleccionado ? "horario-seleccionado" : "horario"}
              onClick={() => setHorarioSeleccionado(horario)}
              disabled={!esHorarioElegible(horario) || horario === horarioSeleccionado}
            >
              {horario}
            </button>
          ))}
        </div>
        <div className="leyenda">
          <div className="leyenda-item">
            <div className="indicador disponible"></div>
            <div className="texto-leyenda">Disponible</div>
          </div>
          <div className="leyenda-item">
            <div className="indicador no-disponible"></div>
            <div className="texto-leyenda">No disponible</div>
          </div>
          <div className="leyenda-item">
            <div className="indicador seleccionado"></div>
            <div className="texto-leyenda">Seleccionado</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservaCita;
