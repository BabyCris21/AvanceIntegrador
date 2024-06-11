import React, { useState } from 'react';
import axios from 'axios';

const RegistroPaciente = () => {
    const [formData, setFormData] = useState({
        dni: '',
        name: '',
        lastname: '',
        bornDate: '',
        phone: '',
        gender: 'M'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/api/patient', formData);

            // Limpiar el formulario después de enviar los datos
            setFormData({
                dni: '',
                name: '',
                lastname: '',
                bornDate: '',
                phone: '',
                gender: 'M'
            });

            alert('Paciente creado exitosamente');
        } catch (error) {
            console.error('Error al crear paciente:', error);
            alert('Error al crear paciente. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className="patient-registration-container">
            <div className="patient-form">
                <h1>Registro de Paciente</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombres:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    
                    <label htmlFor="lastname">Apellidos:</label>
                    <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleInputChange} />
                    
                    <label htmlFor="dni">DNI:</label>
                    <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleInputChange} />
                    
                    <label htmlFor="bornDate">Fecha de Nacimiento:</label>
                    <input type="date" id="bornDate" name="bornDate" value={formData.bornDate} onChange={handleInputChange} />
                    
                    <label htmlFor="phone">Celular:</label>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    
                    <label htmlFor="gender">Género:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="patient-registration-button">
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                    
                    <button type="submit" className="patient-registration-button">REGISTRAR PACIENTE</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroPaciente;
