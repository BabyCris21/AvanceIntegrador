import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const CitaDoctor = () => {
  const [citas, setCitas] = useState([]);
  const [dniDoctor, setDoctorUID] = useState('null'); 

  useEffect(() => {
    const obtenerCitas = async (token, uid) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/appointment/doctor/${uid}`, {
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
          setDoctorUID(decodedToken.uid); // Almacena el DNI del doctor desde el token decodificado
          console.log('UID del doctor:', decodedToken.uid);
          obtenerCitas(jwtToken, decodedToken.uid); // Llama a obtenerCitas con el token
        } else {
          console.error('El token decodificado no contiene el campo dni.');
        }
      } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
      }
    } else {
      console.error('No se encontró el JWT token en el localStorage.');
    }
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {citas.map(cita => (
            <tr key={cita.id}>
              <td>{cita.reason}</td>
              <td>{cita.date}</td>
              <td>{cita.time}</td>
              <td>{cita.doctor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitaDoctor;
