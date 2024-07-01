import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import RecetaForm from './RecetaForm'; // Importa el componente de formulario de receta

const CitaDoctor = () => {
  const [citas, setCitas] = useState([]);
  const [dniDoctor, setDoctorUID] = useState('null');
  const [editingCitaId, setEditingCitaId] = useState(null);
  const [receta, setReceta] = useState({
    medicamentos: [],
    medicamento: '',
    dosis: '',
    frecuencia: '',
    duracion: ''
  });
  const [showRecetaForm, setShowRecetaForm] = useState(false); // Estado para controlar la visibilidad del formulario

  // Función para generar un ID único (solo como ejemplo, puedes implementar según tus necesidades)
  const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

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
        await Promise.all(
          formattedCitas.map(async (cita) => {
            const response = await axios.get(`http://localhost:8080/api/user/${cita.patientDNI}`, {
              headers: {
                'token': token,
              }
            });
            cita.patientName = response.data.name;
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

  const handleEdit = async (id) => {
    setEditingCitaId(id);
    setShowRecetaForm(true); // Mostrar el formulario al editar
    // Aquí podrías implementar lógica adicional para cargar la receta existente si la hay
  };

  const handleSaveReceta = async () => {
    try {
      console.log('Receta a guardar:', receta);
  
      // Construir prescriptionDetails con el formato requerido
      const prescriptionDetails = receta.medicamentos.map(med => ({
        medicine: med.medicamento,
        dosage: med.dosis,
        frequency: med.frecuencia,
        duration: med.duracion
      }));
  
      const newReceta = {
        id: generateId(),
        date: new Date().toISOString(),
        doctor: dniDoctor,
        appointment: editingCitaId,
        prescriptionDetails: prescriptionDetails
      };
  
      // Enviar la receta al backend
      await axios.post(`http://localhost:8080/api/prescription`, newReceta, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      setEditingCitaId(null);
      setShowRecetaForm(false); // Ocultar el formulario después de guardar
      setReceta({
        medicamentos: [],
        medicamento: '',
        dosis: '',
        frecuencia: '',
        duracion: ''
      });
    } catch (error) {
      console.error('Error al guardar receta:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCitaId(null);
    setShowRecetaForm(false); // Ocultar el formulario al cancelar
    setReceta({
      medicamentos: [],
      medicamento: '',
      dosis: '',
      frecuencia: '',
      duracion: ''
    });
  };

  const handleAddMedicamento = () => {
    const newMedicamento = { medicamento: '', dosis: '', frecuencia: '', duracion: '' };
    setReceta(prevState => ({
      ...prevState,
      medicamentos: [...prevState.medicamentos, newMedicamento]
    }));
  };

  return (
    <div>
      <h1>Listado de Citas</h1>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Motivo</th>
            <th>Paciente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.date}</td>
              <td>{cita.time}</td>
              <td>{cita.reason}</td>
              <td>{cita.patientName}</td>
              <td>
                {cita.status !== 'done' && (
                  <>
                    <button onClick={() => handleEdit(cita.id)}>Editar Receta</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mostrar el formulario de receta si showRecetaForm es true */}
      {showRecetaForm && (
        <RecetaForm
          receta={receta}
          setReceta={setReceta}
          handleAddMedicamento={handleAddMedicamento}
          handleSaveReceta={handleSaveReceta}
          handleCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default CitaDoctor;
