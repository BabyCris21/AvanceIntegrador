import React, { useState } from 'react';

const UsuarioInfo = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        correo: '',
        dni: '',
        numeroTelefonico: ''
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
        <div className="usuario-form">
            <h3>Información de Usuario</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />

                <label htmlFor="apellidos">Apellidos:</label>
                <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required />

                <label htmlFor="direccion">Dirección:</label>
                <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />

                <label htmlFor="telefono">Teléfono:</label>
                <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />

                <label htmlFor="correo">Correo:</label>
                <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required />

                <label htmlFor="dni">DNI:</label>
                <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleChange} required />

                <label htmlFor="numeroTelefonico">Número Telefónico:</label>
                <input type="tel" id="numeroTelefonico" name="numeroTelefonico" value={formData.numeroTelefonico} onChange={handleChange} />

                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default UsuarioInfo;
