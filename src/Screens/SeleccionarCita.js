import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservaCita.css';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de importar jwtDecode correctamente

const ReservaCita = () => {
  const fechaActual = new Date();
  const [fecha, setFecha] = useState(fechaActual);
  const [especialidades, setEspecialidades] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);
  const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [infoCita, setInfoCita] = useState('');
  const [usuarioUID, setUsuarioUID] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      console.log('JWT token encontrado:', jwtToken);
      try {
        const decodedToken = jwtDecode(jwtToken);
        console.log('Token decodificado:', decodedToken);
        if (decodedToken.uid) {
          setUsuarioUID(decodedToken.uid);
          console.log('UID del usuario:', decodedToken.uid);
        } else {
          console.error('El token decodificado no contiene el campo uid.');
        }
      } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
      }
    } else {
      console.error('No se encontró el JWT token en el localStorage.');
    }
  }, []);

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

  const obtenerDiaSemana = (date) => date.getDay();

  const horariosDisponibles = [
    '09:00', '10:15', '11:30', '12:45', '14:00', '15:15', '16:30', '17:45'
  ];

  const esHorarioElegible = (horario) => {
    const diaSemana = obtenerDiaSemana(fecha);
    return diaSemana !== 0 && diaSemana !== 6;
  };

  const reservarCita = async () => {
    console.log('infoCita:', infoCita);
    console.log('fecha:', fecha);
    console.log('horarioSeleccionado:', horarioSeleccionado);
    console.log('doctorSeleccionado:', doctorSeleccionado);
    console.log('usuarioUID:', usuarioUID);

    if (!infoCita || !fecha || !horarioSeleccionado || !doctorSeleccionado || !usuarioUID) {
      console.error('Por favor, complete todos los campos necesarios para reservar la cita.');
      return;
    }

    const data = {
      reason: infoCita,
      date: fecha,
      time: horarioSeleccionado,
      doctor: doctorSeleccionado,
      user: usuarioUID
    };

    try {
      const response = await fetch("http://localhost:8080/api/appointment/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('¡La cita se ha reservado exitosamente!');
      } else {
        console.error('Error al reservar la cita:', response.statusText);
      }
    } catch (error) {
      console.error('Error al reservar la cita:', error);
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
              setDoctorSeleccionado(null);
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
          <button onClick={reservarCita}>Reservar Cita</button>
        </div>
      </div>
    </div>
  );
}

export default ReservaCita;
