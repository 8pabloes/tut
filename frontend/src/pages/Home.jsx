import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ carrito, setCarrito }) 
 {
  const [coches, setCoches] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarSoloFavoritos, setMostrarSoloFavoritos] = useState(false);



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

  const añadirAFavoritos = (cocheId) => {
    fetch('http://localhost:8080/favoritos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
  usuarioId: localStorage.getItem('usuarioId'),
  cocheId: cocheId
    })
    })
      .then((res) => {
        if (res.ok) {
          alert('Añadido a favoritos ✅');
        } else {
          alert('Error al añadir');
        }
      })
      .catch(() => alert('Fallo de conexión'));
  };

  const quitarFavorito = (favoritoId) => {
    fetch(`http://localhost:8080/favoritos/${favoritoId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setFavoritos(favoritos.filter(f => f.id !== favoritoId));
          alert('Eliminado de favoritos ❌');
        } else {
          alert('No se pudo eliminar');
        }
      })
      .catch(() => alert('Error de conexión al eliminar'));
  };

  const mostrarFavoritos = () => {
    fetch(`http://localhost:8080/favoritos/usuario/${localStorage.getItem('usuarioId')}`)

      .then((res) => res.json())
      .then((data) => {
        setFavoritos(data);
        setMostrarSoloFavoritos(true);
      })
      .catch(() => alert('Error al cargar favoritos'));
  };

const verTodos = () => {
  setFiltros({
    tipo: '',
    estado: '',
    precioMin: '',
    precioMax: ''
  });
  setMostrarSoloFavoritos(false);
  cargarCoches();
};


  return (
    <>
<header className="bg-dark text-white py-3 mb-4 shadow-sm">
  <div className="container d-flex justify-content-between align-items-center">
    <h1 className="m-0" style={{ fontWeight: '700', letterSpacing: '1px' }}>
      TUT - The Uxes Track 🏁
    </h1>
    <div className="d-flex align-items-center">
      <Link to="/cesta" className="btn btn-light btn-sm me-3">
        🧺 Ver cesta
      </Link>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Racing_flag.svg/1024px-Racing_flag.svg.png"
        alt="Logo"
        style={{ height: '40px' }}
      />
    </div>
  </div>
</header>


    <div className="container">
        <form className="mb-4" onSubmit={handleBuscar}>
        <div className="mb-4 text-end">
            <button type="button" className="btn btn-outline-secondary" onClick={mostrarFavoritos}>
            ❤️ Ver favoritos
            </button>
            <button type="button" className="btn btn-outline-primary me-2" onClick={verTodos}>
            🚗 Ver todos los coches
            </button>
        

          </div>

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
              <input type="number" className="form-control" name="precioMin" placeholder="Precio mín" value={filtros.precioMin} onChange={handleChange} />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" name="precioMax" placeholder="Precio máx" value={filtros.precioMax} onChange={handleChange} />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">Buscar</button>
            </div>
          </div>
        </form>


        <div className="row">
          {mostrarSoloFavoritos
            ? favoritos.map((fav) => (
              <div className="col-md-4 mb-4" key={fav.id}>
                <div className="card h-100 shadow-sm">
                  <img src={fav.coche.imagenes[0]?.url || 'https://via.placeholder.com/400x250?text=Sin+imagen'} className="card-img-top" alt={`${fav.coche.marca} ${fav.coche.modelo}`} style={{ height: '250px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="card-title">{fav.coche.marca} {fav.coche.modelo}</h5>
                    <p>{fav.coche.descripcion.slice(0, 100)}...</p>
                    <p><strong>Precio:</strong> {fav.coche.precio} €</p>
                    <p><strong>Estado:</strong> {fav.coche.estado}</p>
                    <button className="btn btn-outline-warning mt-2 w-100" onClick={() => quitarFavorito(fav.id)}>
                      🗑 Quitar de favoritos
                    </button>
                  </div>
                </div>
              </div>
            ))
            : coches.map((coche) => (
              <div className="col-md-4 mb-4" key={coche.id}>
                <Link to={`/detalle/${coche.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card h-100 shadow-sm">
                    <img src={coche.imagenes[0]?.url || 'https://via.placeholder.com/400x250?text=Sin+imagen'} className="card-img-top" alt={`${coche.marca} ${coche.modelo}`} style={{ height: '250px', objectFit: 'cover' }} />
                    <div className="card-body">
  <h5 className="card-title">{coche.marca} {coche.modelo}</h5>
  <p>{coche.descripcion.slice(0, 100)}...</p>
  <p><strong>Precio:</strong> {coche.precio} €</p>
  <p><strong>Estado:</strong> {coche.estado}</p>

  <button
    className="btn btn-outline-danger mt-2 w-100"
    onClick={(e) => {
      e.preventDefault();
      añadirAFavoritos(coche.id);
    }}
  >
    ❤️ Añadir a favoritos
  </button>

 <button
  className="btn btn-outline-success w-100 mt-2"
  onClick={(e) => {
    e.preventDefault();
    setCarrito([...carrito, coche]);
    alert('Añadido a cesta ✅');
  }}
>
  ➕ Añadir a cesta
</button>

</div>

                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
