import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home({ carrito, setCarrito }) {
  const [coches, setCoches] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarSoloFavoritos, setMostrarSoloFavoritos] = useState(false);

  const [filtros, setFiltros] = useState({
    tipo: '',
    estado: '',
    precioMin: '',
    precioMax: ''
  });

  // Cargar favoritos si hay sesión
  useEffect(() => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) return;

    fetch(`http://localhost:8080/api/favoritos/usuario/${usuarioId}`)
      .then(res => res.json())
      .then(data => {
        setFavoritos(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error("Error cargando favoritos", err));
  }, []);

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
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
      toast.warning("Inicia sesión para guardar favoritos");
      return;
    }

    fetch('http://localhost:8080/favoritos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ usuarioId, cocheId })
    })
      .then((res) => {
        if (res.ok) {
          toast.success('Añadido a favoritos ❤️');
        } else {
          toast.error('Error al añadir a favoritos');
        }
      })
      .catch(() => toast.error('Fallo de conexión'));
  };

  const quitarFavorito = (favoritoId) => {
    fetch(`http://localhost:8080/favoritos/${favoritoId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setFavoritos(favoritos.filter(f => f.id !== favoritoId));
          toast.info('Eliminado de favoritos');
        } else {
          toast.error('No se pudo eliminar');
        }
      })
      .catch(() => toast.error('Error de conexión al eliminar'));
  };

  const mostrarFavoritos = () => {
    fetch(`http://localhost:8080/favoritos/usuario/${localStorage.getItem('usuarioId')}`)
      .then((res) => res.json())
      .then((data) => {
        setFavoritos(Array.isArray(data) ? data : []);
        setMostrarSoloFavoritos(true);
      })
      .catch(() => toast.error('Error al cargar favoritos'));
  };

  const verTodos = () => {
    setFiltros({ tipo: '', estado: '', precioMin: '', precioMax: '' });
    setMostrarSoloFavoritos(false);
    setTimeout(() => cargarCoches(), 0);
  };

  const añadirACesta = (coche) => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
      toast.warning("Debes iniciar sesión para añadir a la cesta");
      return;
    }

    setCarrito([...carrito, coche]);
    toast.success("Añadido a cesta");
  };

  return (
    <>
      <ToastContainer position="top-center" />
      

      <div className="container">
        <form className="mb-4" onSubmit={handleBuscar}>
          <div className="mb-4 d-flex justify-content-end flex-wrap gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={mostrarFavoritos}>
              ❤️ Ver favoritos
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={verTodos}>
              🚗 Ver todos los coches
            </button>
            <Link to="/cesta" className="btn btn-outline-dark">
              🛒 Ver cesta
            </Link>
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
          {(mostrarSoloFavoritos ? favoritos : coches).map((item) => {
            const coche = mostrarSoloFavoritos ? item.coche : item;
            const id = mostrarSoloFavoritos ? item.id : coche.id;

            return (
              <div className="col-md-4 mb-4" key={id}>
                <Link to={`/detalle/${coche.id}`} className="text-decoration-none text-dark">
                  <div className="card h-100 shadow-sm">
                    <img src={coche.imagenes?.[0]?.url || 'https://via.placeholder.com/400x250?text=Sin+imagen'} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} alt={`${coche.marca} ${coche.modelo}`} />
                    <div className="card-body">
                      <h5 className="card-title">{coche.marca} {coche.modelo}</h5>
                      <p>{coche.descripcion?.slice(0, 100)}...</p>
                      <p><strong>Precio:</strong> {coche.precio} €</p>
                      <p><strong>Estado:</strong> {coche.estado}</p>

                      {mostrarSoloFavoritos ? (
                        <button className="btn btn-outline-warning w-100 mt-2" onClick={(e) => { e.preventDefault(); quitarFavorito(id); }}>
                          🗑 Quitar de favoritos
                        </button>
                      ) : (
                        <>
                          <button className="btn btn-outline-danger w-100 mt-2" onClick={(e) => { e.preventDefault(); añadirAFavoritos(coche.id); }}>
                            ❤️ Añadir a favoritos
                          </button>
                          <button className="btn btn-light border w-100 mt-2" onClick={(e) => { e.preventDefault(); añadirACesta(coche); }}>
                            Añadir a cesta
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
