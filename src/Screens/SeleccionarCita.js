import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservaCita.css';

const ReservaCita = () => {
  const fechaActual = new Date();
  const [fecha, setFecha] = useState(fechaActual);
  const [especialidades, setEspecialidades] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);
  const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [infoCita, setInfoCita] = useState('');

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/specialty/');
        if (response.ok) {
          const data = await response.json();
          setEspecialidades(data);
        } else {
          console.error('Error al obtener las especialidades:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener las especialidades:', error);
      }
    };

    fetchSpecialties();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/doctor/');
        if (response.ok) {
          const data = await response.json();
          const doctoresFiltrados = data.filter(doctor => 
            doctor.specialty.some(spec => spec.uid === especialidadSeleccionada)
          );
          setDoctores(doctoresFiltrados);
        } else {
          console.error('Error al obtener los doctores:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los doctores:', error);
      }
    };

    if (especialidadSeleccionada) {
      fetchDoctors();
    }
  }, [especialidadSeleccionada]);

  const handleFechaChange = (date) => {
    setFecha(date);
    setHorarioSeleccionado(null);
  };

  const obtenerDiaSemana = (date) => {
    return date.getDay();
  };

  const horariosDisponibles = [
    '09:00',
    '10:15',
    '11:30',
    '12:45',
    '14:00',
    '15:15',
    '16:30',
    '17:45',
  ];

  const esHorarioElegible = (horario) => {
    const diaSemana = obtenerDiaSemana(fecha);
    switch (diaSemana) {
      case 6:
        return false;
      case 0:
        return false;
      default:
        return true;
    }
  };

  return (
    <div className="contenedor-80">
      <div className="parte">
        <h3>Selecciona:</h3>
        <div className="campo">
          <label htmlFor="especialidad">Especialidad:</label>
          <select
            name="especialidad"
            id="especialidad"
            onChange={(e) => {
              setEspecialidadSeleccionada(e.target.value);
              setDoctorSeleccionado(null); // Limpiar la selección de doctor al cambiar de especialidad
            }}
          >
            <option value="">Seleccione una especialidad</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.id} value={especialidad.id}>
                {especialidad.name}
              </option>
            ))}
          </select>
        </div>
        {especialidadSeleccionada && (
          <div className="campo">
            <label htmlFor="doctor">Selecciona Doctor:</label>
            <select
              name="doctor"
              id="doctor"
              onChange={(e) => setDoctorSeleccionado(e.target.value)}
            >
              <option value="">Seleccione un doctor</option>
              {doctores.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {doctorSeleccionado && (
          <div className="campo">
            <label htmlFor="infoCita">Información de la cita:</label>
            <textarea
              name="infoCita"
              id="infoCita"
              value={infoCita}
              onChange={(e) => setInfoCita(e.target.value)}
              rows="4"
              cols="50"
            ></textarea>
          </div>
        )}
      </div>

      <div className="parte">
        <h3>Selecciona la fecha:</h3>
        <DatePicker
          selected={fecha}
          onChange={handleFechaChange}
          minDate={fechaActual}
          inline
        />
      </div>

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
