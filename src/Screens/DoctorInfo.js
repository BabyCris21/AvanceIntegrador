import React, { useState } from 'react';

const DoctorInfo = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        dni: '',
        genero: '',
        fechaNacimiento: '',
        celular: '',
        especialidad: '',
        codMedico: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="doctor-form">
            <h3>Información de Doctor</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />

                <label htmlFor="apellidos">Apellidos:</label>
                <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="dni">DNI:</label>
                <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleChange} required />

                <label htmlFor="genero">Género:</label>
                <select id="genero" name="genero" value={formData.genero} onChange={handleChange} required>
                    <option value="">Selecciona género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>

                <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />

                <label htmlFor="celular">Celular:</label>
                <input type="tel" id="celular" name="celular" value={formData.celular} onChange={handleChange} required />

                <label htmlFor="especialidad">Especialidad:</label>
                <input type="text" id="especialidad" name="especialidad" value={formData.especialidad} onChange={handleChange} required />

                <label htmlFor="codMedico">Cod. Médico:</label>
                <input type="text" id="codMedico" name="codMedico" value={formData.codMedico} onChange={handleChange} required />

                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default DoctorInfo;
