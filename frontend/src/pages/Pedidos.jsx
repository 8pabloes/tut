import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/pedidos/usuario/1')
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(() => alert('Error al cargar pedidos'));
  }, []);

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-secondary mb-4">← Volver</Link>
      <h2 className="mb-4">📦 Mis Pedidos</h2>

      {pedidos.length === 0 ? (
        <p>No tienes pedidos aún.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Pedido #{pedido.id}</h5>
              <p><strong>Fecha:</strong> {pedido.fecha}</p>
              <p><strong>Total:</strong> {pedido.total} €</p>

              <h6>Coches comprados:</h6>
              <ul>
                {pedido.coches.map((coche) => (
                  <li key={coche.id}>
                    {coche.marca} {coche.modelo} - {coche.precio} €
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Pedidos;
