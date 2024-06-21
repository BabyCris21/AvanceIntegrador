import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Registro.css";

const Registro = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formData, setFormData] = useState({
        dni: '',
        CMP: '',
        name: '',
        lastname: '',
        bornDate: '',
        phone: '',
        email: '',
        address: '',
        gender: '',
        specialty: [] // Cambiado a un array para múltiples especialidades
    });
    const [specialties, setSpecialties] = useState([]); // Estado para las especialidades

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/specialty/');
                const data = await response.json();
                setSpecialties(data);
            } catch (error) {
                console.error('Error al obtener las especialidades:', error);
            }
        };

        fetchSpecialties();
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'specialty') {
            setFormData({ ...formData, [name]: [value] }); // Convertir el valor en un array
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const dataToSend = { ...formData, password };

        console.log('Datos enviados:', JSON.stringify(dataToSend, null, 2));

        try {
            const response = await fetch('http://localhost:8080/api/doctor/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Usuario registrado exitosamente');
                // Aquí podrías redirigir al usuario a la página de login
            } else {
                alert(`Error: ${result.message}`);
                console.error('Error:', result);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="registro-container">
            <div className="registro-form">
                <h1>Registro</h1>
                <h4>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombres:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Apellidos:</label>
                        <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bornDate">Fecha de Nacimiento:</label>
                        <input type="date" id="bornDate" name="bornDate" value={formData.bornDate} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dni">DNI:</label>
                        <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CMP">CMP:</label>
                        <input type="text" id="CMP" name="CMP" value={formData.CMP} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Celular:</label>
                        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección:</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Género:</label>
                        <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="registro-button">
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="specialty">Selecciona Especialidad:</label>
                        <select id="specialty" name="specialty" value={formData.specialty[0] || ''} onChange={handleInputChange} className="registro-button">
                            <option value="">Selecciona una opción</option>
                            {specialties.map((specialty) => (
                                <option key={specialty.id} value={specialty.id}>
                                    {specialty.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="password-toggle-button"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm_password">Confirmar Contraseña:</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirm_password"
                            name="confirm_password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="password-toggle-button"
                        >
                            {showConfirmPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <button type="submit" className="registro-button">REGISTRARSE</button>
                </form>
            </div>
        </div>
    );
};

export default Registro;
