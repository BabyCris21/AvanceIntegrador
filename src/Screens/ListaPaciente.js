import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaPaciente = () => {
  const [pacientes, setPacientes] = useState([]);

  const jwtToken = localStorage.getItem('token');
  useEffect(() => {
    if (jwtToken) {
      console.log('JWT token encontrado:', jwtToken);
      obtenerPacientes(jwtToken); // Llama a obtenerPacientes con el token
    } else {
      console.error('No se encontró el JWT token en el localStorage.');
    }
  }, [jwtToken]);

  const obtenerPacientes = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/patient', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPacientes(response.data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleEdit = (dni) => {
    // Lógica para editar el paciente con el DNI especificado
    console.log('Editar paciente:', dni);
  };

  const handleDelete = async (dni) => {
    // Lógica para eliminar el paciente con el DNI especificado
    try {
      await axios.delete(`http://localhost:8080/api/patient/${dni}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPacientes(pacientes.filter(paciente => paciente.dni !== dni));
      console.log('Paciente eliminado:', dni);
    } catch (error) {
      console.error('Error al eliminar el paciente:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Pacientes</h1>
      <table>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Fecha de Nacimiento</th>
            <th>Celular</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(paciente => (
            <tr key={paciente.dni}>
              <td>{paciente.dni}</td>
              <td>{paciente.name}</td>
              <td>{paciente.lastname}</td>
              <td>{formatFecha(paciente.bornDate)}</td>
              <td>{paciente.phone}</td>
              <td>{paciente.gender === 'M' ? 'Masculino' : 'Femenino'}</td>
              <td>
                <button onClick={() => handleEdit(paciente.dni)}>Editar</button>
                <button onClick={() => handleDelete(paciente.dni)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPaciente;
