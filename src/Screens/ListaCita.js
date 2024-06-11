import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ListaCita = () => {
  const [citas, setCitas] = useState([]);
  const [usuarioUID, setUsuarioUID] = useState(null);

  useEffect(() => {
    const obtenerCitas = async (token, uid) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/appointment/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCitas(response.data);
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
        if (decodedToken.uid) {
          setUsuarioUID(decodedToken.uid);
          console.log('UID del usuario:', decodedToken.uid);
          obtenerCitas(jwtToken, decodedToken.uid);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/appointment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCitas(citas.filter(cita => cita.id !== id));
      console.log('Cita eliminada:', id);
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
    }
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
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map(cita => (
            <tr key={cita.id}>
              <td>{cita.reason}</td>
              <td>{formatFecha(cita.date)}</td>
              <td>{cita.time}</td>
              <td>{cita.doctor}</td>
              <td>{cita.status ? 'Pendiente' : 'Completada'}</td>
              <td>
                <button onClick={() => handleDelete(cita.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaCita;
