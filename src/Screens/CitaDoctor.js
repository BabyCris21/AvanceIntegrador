import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const CitaDoctor = () => {
  const [citas, setCitas] = useState([]);
  const [dniDoctor, setDoctorUID] = useState('null');

  useEffect(() => {
    const obtenerCitas = async (token, dni) => {
      try {
        console.log('Enviando solicitud al backend con token:', token, 'y DNI:', dni);
        const response = await axios.get(`http://localhost:8080/api/appointment/doctor/${dni}`, {
          headers: {
            'token': token,
          }
        });
        const formattedCitas = response.data.map(cita => ({
          ...cita,
          date: formatDate(cita.date)
        }));
        setCitas(formattedCitas);
      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    };

    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      console.log('JWT token encontrado:', jwtToken);
      try {
        const decodedToken = jwtDecode(jwtToken);
        console.log('Token decodificado:', decodedToken);
        if (decodedToken.dni) {
          setDoctorUID(decodedToken.dni); // Almacena el DNI del doctor desde el token decodificado
          console.log('UID del doctor:', decodedToken.dni);
          obtenerCitas(jwtToken, decodedToken.dni); // Llama a obtenerCitas con el token
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/appointment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCitas(citas.filter(cita => cita.id !== id));
    } catch (error) {
      console.error('Error al eliminar cita:', error);
    }
  };

  const handleEdit = (id) => {
    // Implementa la lógica para editar la cita aquí.
    console.log('Editar cita con id:', id);
  };

  return (
    <div>
      <h1>Lista de Citas del Doctor</h1>
      <table>
        <thead>
          <tr>
            <th>Razón</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Doctor</th>
            <th>Estado</th>
            <th>¿Ya completó su cita?</th>
          </tr>
        </thead>
        <tbody>
          {citas.map(cita => (
            <tr key={cita.id}>
              <td>{cita.reason}</td>
              <td>{cita.date}</td>
              <td>{cita.time}</td>
              <td>{cita.doctor}</td>
              <td>{cita.status ? 'Pendiente' : 'Completado'}</td>
              <td>
                {!cita.status && (
                  <button onClick={() => handleDelete(cita.id)} disabled={cita.status===false}>
                    Aceptar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitaDoctor;
