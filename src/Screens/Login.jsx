import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate desde react-router-dom
import "./Login.css";

const Login = () => {
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook para redireccionar

    const handleDniChange = (e) => {
        setDni(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = { dni, password };

        console.log('Datos enviados:', JSON.stringify(dataToSend, null, 2));

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('token', result.token); // Guardar el token en localStorage
                alert('Inicio de sesión exitoso');
                // Redireccionar al usuario después de un inicio de sesión exitoso
                navigate('/home'); // Asegúrate de que esta ruta exista en tu aplicación
            } else {
                alert(`Error: ${result.message}`);
                console.error('Error:', result);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="company-photo"></div>
            <div className="login-form">
                <h1>Iniciar Sesión</h1>
                <h4>¿No tienes una cuenta? <Link to="/registro">Crea una</Link></h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="dni">DNI:</label>
                        <input type="text" id="dni" name="dni" value={dni} onChange={handleDniChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button type="submit" className="login-button">INICIAR SESION</button>
                </form>
                <div className="forgot-password">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
                {/* <div className="social-login">
                    <p>O inicia sesión con:</p>
                    <div className="social-buttons">
                        <button className="google-button">Google</button>
                        <button className="facebook-button">Facebook</button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
