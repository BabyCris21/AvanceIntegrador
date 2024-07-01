import React from 'react';
import './RecetaForm.css'; // Importar el archivo CSS para los estilos


const MedicamentoForm = ({ medicamento, dosis, frecuencia, duracion, handleInputChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Medicamento"
        name="medicamento"
        value={medicamento}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Dosis"
        name="dosis"
        value={dosis}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Frecuencia"
        name="frecuencia"
        value={frecuencia}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Duración"
        name="duracion"
        value={duracion}
        onChange={handleInputChange}
      />
    </div>
  );
};

const RecetaForm = ({ receta, setReceta, handleAddMedicamento, handleSaveReceta, handleCancelEdit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReceta(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Formulario de Receta</h2>
      <div>
        {receta.medicamentos.map((med, index) => (
          <MedicamentoForm
            key={index}
            medicamento={med.medicamento}
            dosis={med.dosis}
            frecuencia={med.frecuencia}
            duracion={med.duracion}
            handleInputChange={(e) => {
              const { name, value } = e.target;
              setReceta(prevState => ({
                ...prevState,
                medicamentos: prevState.medicamentos.map((item, idx) => idx === index ? { ...item, [name]: value } : item)
              }));
            }}
          />
        ))}
        <button onClick={handleAddMedicamento}>Agregar Medicamento</button>
      </div>
      <div>
        <button onClick={handleSaveReceta}>Guardar Receta</button>
        <button onClick={handleCancelEdit}>Cancelar</button>
      </div>
    </div>
  );
};

export default RecetaForm;
