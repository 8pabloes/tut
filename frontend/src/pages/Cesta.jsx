import React from 'react';
import { Link } from 'react-router-dom';

function Cesta({ carrito, finalizarCompra }) {
  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-secondary mb-4">← Volver</Link>
      <h2 className="mb-4">🧺 Mi cesta</h2>

      {carrito.length === 0 ? (
        <p>No hay coches en la cesta.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrito.map((coche, index) => (
              <li key={index} className="list-group-item">
                {coche.marca} {coche.modelo} - {coche.precio} €
              </li>
            ))}
          </ul>
          <Link to="/pago" className="btn btn-success">
  Ir a pagar
</Link>

        </>
      )}
    </div>
  );
}

export default Cesta;
