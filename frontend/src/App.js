import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [coches, setCoches] = useState([]);
  const [filtros, setFiltros] = useState({
    tipo: '',
    estado: '',
    precioMin: '',
    precioMax: ''
  });

  useEffect(() => {
    cargarCoches();
  }, []);

  const cargarCoches = () => {
    const params = new URLSearchParams();

    if (filtros.tipo) params.append('tipo', filtros.tipo);
    if (filtros.estado) params.append('estado', filtros.estado);
    if (filtros.precioMin) params.append('precioMin', filtros.precioMin);
    if (filtros.precioMax) params.append('precioMax', filtros.precioMax);

    fetch(`http://localhost:8080/coches?${params.toString()}`)
      .then(response => response.json())
      .then(data => setCoches(data))
      .catch(error => console.error('Error al cargar coches:', error));
  };

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    cargarCoches();
  };

  return (
    <>
      <header className="bg-dark text-white py-3 mb-4 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="m-0" style={{ fontWeight: '700', letterSpacing: '1px' }}>
            TUT - The Uxes Track 🏁
          </h1>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Racing_flag.svg/1024px-Racing_flag.svg.png"
            alt="Logo"
            style={{ height: '40px' }}
          />
        </div>
      </header>

      <div className="container">
        {/* FILTROS */}
        <form className="mb-4" onSubmit={handleBuscar}>
          <div className="row">
            <div className="col-md-3">
              <select className="form-control" name="tipo" onChange={handleChange} value={filtros.tipo}>
                <option value="">Todos los tipos</option>
                <option value="rally">Rally</option>
                <option value="clásico">Clásico</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-control" name="estado" onChange={handleChange} value={filtros.estado}>
                <option value="">Todos los estados</option>
                <option value="disponible">Disponible</option>
                <option value="reservado">Reservado</option>
                <option value="vendido">Vendido</option>
              </select>
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                name="precioMin"
                placeholder="Precio mín"
                value={filtros.precioMin}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                name="precioMax"
                placeholder="Precio máx"
                value={filtros.precioMax}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">Buscar</button>
            </div>
          </div>
        </form>

        {/* COCHES */}
        <div className="row">
          {coches.map((coche) => (
            <div className="col-md-4 mb-4" key={coche.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={coche.imagenes[0]?.url || 'https://via.placeholder.com/400x250?text=Sin+imagen'}
                  className="card-img-top"
                  alt={`${coche.marca} ${coche.modelo}`}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{coche.marca} {coche.modelo}</h5>
                  <p className="card-text">{coche.descripcion.slice(0, 100)}...</p>
                  <p><strong>Precio:</strong> {coche.precio} €</p>
                  <p><strong>Estado:</strong> {coche.estado}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
