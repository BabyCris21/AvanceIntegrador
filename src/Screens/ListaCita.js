import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaCita = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const obtenerCitas = async (dniUsuario, token) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/appointment/findbyuser${dniUsuario}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCitas(response.data);
      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    };

    // Aquí deberías obtener el token del usuario logeado y pasarlo como argumento
    const token = obtenerTokenUsuario();
    // Aquí deberías obtener el DNI del usuario logeado y pasarlo como argumento
    const dniUsuario = obtenerDniUsuarioDesdeToken(token);

    obtenerCitas(dniUsuario, token);
  }, []);

  const obtenerTokenUsuario = () => {
    // Implementa la lógica para obtener el token del usuario logeado
    // Puedes usar localStorage, sessionStorage, cookies, o cualquier otro método de tu elección para almacenar y recuperar el token
    // En este ejemplo, simplemente se devuelve un token ficticio
    return 'token_de_prueba';
  };

  const obtenerDniUsuarioDesdeToken = (token) => {
    // Implementa la lógica para extraer el DNI del usuario desde el token
    // Por ejemplo, si el token está en formato JWT, podrías decodificarlo para extraer el DNI
    // En este ejemplo, se devuelve un DNI ficticio
    return '71076855';
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

export default ListaCita;
