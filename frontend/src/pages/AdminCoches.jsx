// src/pages/AdminCoches.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function AdminCoches() {
  const [coches, setCoches] = useState([]);
  const [nuevoCoche, setNuevoCoche] = useState({
    marca: '', modelo: '', descripcion: '', precio: '', estado: '', tipo: '', año: '', stock: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/coches')
      .then(res => res.json())
      .then(data => setCoches(data));
  }, []);

  const handleInputChange = e => {
    setNuevoCoche({ ...nuevoCoche, [e.target.name]: e.target.value });
  };

  const crearCoche = () => {
    fetch('http://localhost:8080/coches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCoche)
    })
      .then(res => res.json())
      .then(coche => {
        toast.success('Coche creado ✅');
        setCoches([...coches, coche]);
        setNuevoCoche({ marca: '', modelo: '', descripcion: '', precio: '', estado: '', tipo: '', año: '', stock: '' });
      });
  };

  const borrarCoche = id => {
    fetch(`http://localhost:8080/coches/${id}`, { method: 'DELETE' })
      .then(() => {
        toast.info('Coche eliminado 🗑');
        setCoches(coches.filter(c => c.id !== id));
      });
  };

  return (
    <div className="container mt-4">
      <h2>🔧 Administración de Coches</h2>

      <div className="row mt-4">
        <div className="col-md-6">
          <h4>➕ Nuevo coche</h4>
          {['marca', 'modelo', 'descripcion', 'precio', 'estado', 'tipo', 'año', 'stock'].map(campo => (
            <input
              key={campo}
              className="form-control mb-2"
              placeholder={campo}
              name={campo}
              value={nuevoCoche[campo]}
              onChange={handleInputChange}
            />
          ))}
          <button onClick={crearCoche} className="btn btn-success w-100">Crear coche</button>
        </div>

        <div className="col-md-6">
          <h4>📋 Lista actual</h4>
          <ul className="list-group">
            {coches.map(c => (
              <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                {c.marca} {c.modelo}
                <button className="btn btn-sm btn-danger" onClick={() => borrarCoche(c.id)}>Borrar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminCoches;
