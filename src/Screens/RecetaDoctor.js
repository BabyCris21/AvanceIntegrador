import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecetaDoctor = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/prescription', {
          headers: {
            'token': `${localStorage.getItem('token')}`
            
          }
        });
        console.log('Response from API:', response.data); // Log the response to inspect data structure
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error al obtener las recetas:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      <h1>Listado de Recetas</h1>
      <table>
        <thead>
          <tr>
            <th>Fecha de la Cita</th>
            <th>Medicamento</th>
            <th>Dosis</th>
            <th>Frecuencia</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td>{formatDate(prescription.date)}</td>
              {prescription.prescriptionDetails && prescription.prescriptionDetails.length > 0 ? (
                <>
                  <td>{prescription.prescriptionDetails[0].medicine}</td>
                  <td>{prescription.prescriptionDetails[0].dosage}</td>
                  <td>{prescription.prescriptionDetails[0].frequency}</td>
                  <td>{prescription.prescriptionDetails[0].duration}</td>
                </>
              ) : (
                <>
                  <td colSpan="4">No hay detalles de receta disponibles</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecetaDoctor;
