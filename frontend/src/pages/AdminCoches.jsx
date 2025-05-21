import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminCoches() {
  const navigate = useNavigate();
  const usuarioNombre = localStorage.getItem('usuarioNombre');

  // 🛑 Si no eres Pablo, te echamos antes de hacer nada más
  useEffect(() => {
    if (usuarioNombre !== 'Pablo') {
      navigate('/');
    }
  }, [usuarioNombre, navigate]);

  // ✅ Hooks bien colocados
  const [coches, setCoches] = useState([]);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    año: '',
    precio: '',
    stock: '',
    descripcion: '',
    tipo: '',
    estado: ''
  });

  const cargarCoches = () => {
    fetch('http://localhost:8080/coches')
      .then(res => res.json())
      .then(data => setCoches(data));
  };

  useEffect(() => {
    cargarCoches();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:8080/coches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          alert('Coche creado correctamente');
          setFormData({
            marca: '',
            modelo: '',
            año: '',
            precio: '',
            stock: '',
            descripcion: '',
            tipo: '',
            estado: ''
          });
          cargarCoches();
        }
      });
  };

  const borrarCoche = id => {
    if (!window.confirm('¿Seguro que quieres borrar este coche?')) return;

    fetch(`http://localhost:8080/coches/${id}`, {
      method: 'DELETE'
    })
      .then(() => cargarCoches());
  };

  return (
    <div className="container mt-5">
      <h2>🔧 Panel de Administración</h2>
      <form onSubmit={handleSubmit} className="row g-3 my-4">
        <input name="marca" placeholder="Marca" className="form-control" value={formData.marca} onChange={handleChange} required />
        <input name="modelo" placeholder="Modelo" className="form-control" value={formData.modelo} onChange={handleChange} required />
        <input name="año" placeholder="Año" type="number" className="form-control" value={formData.año} onChange={handleChange} required />
        <input name="precio" placeholder="Precio" type="number" className="form-control" value={formData.precio} onChange={handleChange} required />
        <input name="stock" placeholder="Stock" type="number" className="form-control" value={formData.stock} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" className="form-control" value={formData.descripcion} onChange={handleChange} required />
        <select name="tipo" className="form-control" value={formData.tipo} onChange={handleChange} required>
          <option value="">Selecciona tipo</option>
          <option value="rally">Rally</option>
          <option value="clásico">Clásico</option>
        </select>
        <select name="estado" className="form-control" value={formData.estado} onChange={handleChange} required>
          <option value="">Selecciona estado</option>
          <option value="disponible">Disponible</option>
          <option value="reservado">Reservado</option>
          <option value="vendido">Vendido</option>
        </select>
        <button className="btn btn-success mt-3" type="submit">Guardar coche</button>
      </form>

      <h4>🧾 Lista de coches</h4>
      <ul className="list-group">
        {coches.map(c => (
          <li className="list-group-item d-flex justify-content-between" key={c.id}>
            {c.marca} {c.modelo} - {c.precio} € ({c.estado}) [{c.stock} en stock]
            <button className="btn btn-danger btn-sm" onClick={() => borrarCoche(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCoches;
