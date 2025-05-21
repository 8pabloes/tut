import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/usuarios/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Ya existe ese email');
      })
      .then(data => {
        alert('Registro correcto');
        localStorage.setItem('usuarioId', data.id);
        localStorage.setItem('usuarioNombre', data.nombre);
        navigate('/');
      })
      .catch(() => alert('Error al registrar'));
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleRegistro}>
        <input className="form-control mb-3" type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input className="form-control mb-3" type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="form-control mb-3" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-primary" type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Registro;
