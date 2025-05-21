import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login({ setUsuarioNombre }) {
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
        localStorage.setItem('usuarioId', data.id);
        localStorage.setItem('usuarioNombre', data.nombre);
        if (setUsuarioNombre) setUsuarioNombre(data.nombre);

        // ✅ Mostrar toast
        toast.success('✅ Sesión iniciada correctamente', {
          autoClose: 2000,
          hideProgressBar: true
        });

        // ✅ Redirigir después de 2.5 segundos (más que el toast)
        setTimeout(() => navigate('/'), 2500);
      })
      .catch(() => {
        toast.error('❌ Correo o contraseña incorrectos', {
          autoClose: 2000,
          hideProgressBar: true
        });
      });
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100" type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
