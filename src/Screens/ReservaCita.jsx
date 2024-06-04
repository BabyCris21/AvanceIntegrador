import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservaCita.css'; 
const UsuarioInfo = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        correo: '',
        dni: '',
        numeroTelefonico: '',
        fechaSeleccionada: null,
        horaSeleccionada: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, fechaSeleccionada: date });
    };

    const handleTimeChange = (e) => {
        setFormData({ ...formData, horaSeleccionada: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className='user-page'>
            <div className='user-container'>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nombre:
                            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                        </label>
                        {/* Agrega otros campos de entrada aquí */}
                        <div>
                            <h3>Seleccionar Fecha:</h3>
                            <DatePicker
                                selected={formData.fechaSeleccionada}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Seleccionar fecha"
                                showPopperArrow={false} 
                            />
                        </div>
                        <div>
                            <h3>Seleccionar Horario:</h3>
                            <select value={formData.horaSeleccionada} onChange={handleTimeChange}>
                                <option value="">Seleccionar horario</option>
                                <option value="8:00-8:30">8:00-8:30</option>
                                <option value="8:30-9:30">8:30-9:30</option>
                                <option value="9:30-10:00">9:30-10:00</option>
                                <option value="10:00-10:30">10:00-10:30</option>
                                <option value="10:30-11:00">10:30-11:00</option>
                                <option value="11:00-11:30">11:00-11:30</option>
                                <option value="11:30-12:00">11:30-12:00</option>
                                <option value="12:00-12:30">12:00-12:30</option>
                                <option value="12:30-13:00">12:30-13:00</option>
                            </select>
                        </div>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UsuarioInfo;
