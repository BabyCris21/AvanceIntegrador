import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const ListaCita = () => {
  const [citas, setCitas] = useState([]);
  const [doctores, setDoctores] = useState({});
  const [usuarioUID, setUsuarioUID] = useState(null);

  useEffect(() => {
    const obtenerCitas = async (token, dni) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/appointment/${dni}`, {
          headers: {
            'token': token
          }
        });
        setCitas(response.data);

        // Obtener los detalles de los doctores
        const doctorDnis = response.data.map(cita => cita.doctor);
        const uniqueDoctorDnis = [...new Set(doctorDnis)];
        const doctorDetails = await obtenerDetallesDoctores(token, uniqueDoctorDnis);
        setDoctores(doctorDetails);
      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    };

    const obtenerDetallesDoctores = async (token, doctorDnis) => {
      try {
        const details = {};
        for (let dni of doctorDnis) {
          const response = await axios.get(`http://localhost:8080/api/doctor/${dni}`, {
            headers: {
              'token': token
            }
          });
          details[dni] = response.data.name; // Asegúrate de que el nombre del doctor esté en la propiedad `name`
        }
        return details;
      } catch (error) {
        console.error('Error al obtener detalles del doctor:', error);
        return {};
      }
    };

    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      console.log('JWT token encontrado:', jwtToken);
      try {
        const decodedToken = jwtDecode(jwtToken);
        console.log('Token decodificado:', decodedToken);
        if (decodedToken.dni) {
          setUsuarioUID(decodedToken.dni);
          console.log('UID del usuario:', decodedToken.dni);
          obtenerCitas(jwtToken, decodedToken.dni);
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

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h1>Lista de Citas</h1>
      <table>
        <thead>
          <tr>
            <th>Razón</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Doctor</th>
          </tr>
        </thead>
        <tbody>
          {citas.map(cita => (
            <tr key={cita.id}>
              <td>{cita.reason}</td>
              <td>{formatFecha(cita.date)}</td>
              <td>{cita.time}</td>
              <td>{doctores[cita.doctor] || 'Desconocido'}</td> {/* Muestra el nombre del doctor o 'Desconocido' si no se encuentra */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaCita;
