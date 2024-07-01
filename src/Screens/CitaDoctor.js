import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const CitaDoctor = () => {
  const [citas, setCitas] = useState([]);
  const [dniDoctor, setDoctorUID] = useState('null');
  const [editingCitaId, setEditingCitaId] = useState(null);
  const [recetaTexto, setRecetaTexto] = useState('');

  useEffect(() => {
    const obtenerCitas = async (token, dni) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/appointment/doctor/${dni}`, {
          headers: {
            'token': token,
          }
        });
        const formattedCitas = response.data.map(cita => ({
          id: cita.id,
          reason: cita.reason,
          date: formatDate(cita.date),
          time: cita.time,
          doctor: cita.doctor,
          patientDNI: cita.user,
          status: cita.status,
        }));
        // Obtener nombres de pacientes
        await Promise.all(
          formattedCitas.map(async (cita) => {
            const response = await axios.get(`http://localhost:8080/api/user/${cita.patientDNI}`, {
              headers: {
                'token': token,
              }
            });
            cita.patientName = response.data.name; // Asignar nombre del paciente
          })
        );
        setCitas(formattedCitas);
      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    };

    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken);
        if (decodedToken.dni) {
          setDoctorUID(decodedToken.dni);
          obtenerCitas(jwtToken, decodedToken.dni);
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
    setEditingCitaId(id);
    // Aquí podrías implementar lógica adicional para cargar la receta existente si la hay
  };

  const handleSaveReceta = async () => {
    try {
      // Implementa la lógica para guardar la receta
      console.log('Guardando receta:', recetaTexto);
      // Aquí deberías hacer la llamada axios para guardar la receta actualizada en el backend
      // Luego podrías actualizar localmente las citas si es necesario
      setEditingCitaId(null);
      setRecetaTexto('');
    } catch (error) {
      console.error('Error al guardar receta:', error);
    }
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
            <th>Paciente</th>
            <th>DNI Paciente</th>
            <th>Receta</th>
          </tr>
        </thead>
        <tbody>
          {citas.map(cita => (
            <tr key={cita.id}>
              <td>{cita.reason}</td>
              <td>{cita.date}</td>
              <td>{cita.time}</td>
              <td>{cita.doctor}</td>
              <td>{cita.patientName}</td>
              <td>{cita.patientDNI}</td>
              <td>
                {editingCitaId === cita.id ? (
                  <div className="popup">
                    <textarea
                      value={recetaTexto}
                      onChange={(e) => setRecetaTexto(e.target.value)}
                      maxLength={100}
                      placeholder="Detalles de la receta (máximo 100 caracteres)"
                    />
                    <br />
                    <button onClick={handleSaveReceta}>Guardar</button>
                  </div>
                ) : (
                  <button onClick={() => handleEdit(cita.id)}>Editar</button>
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
