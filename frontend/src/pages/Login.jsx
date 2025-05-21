import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Login incorrecto');
      })
      .then(data => {
        alert('Sesión iniciada');
        localStorage.setItem('usuarioId', data.id);
        localStorage.setItem('usuarioNombre', data.nombre);
        navigate('/');
      })
      .catch(() => alert('Correo o contraseña incorrectos'));
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input className="form-control mb-3" type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="form-control mb-3" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
