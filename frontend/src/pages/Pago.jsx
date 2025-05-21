import React from 'react';
import { useNavigate } from 'react-router-dom';

function Pago({ carrito, setCarrito }) {
  const navigate = useNavigate();
  const total = carrito.reduce((sum, coche) => sum + coche.precio, 0);
  const usuarioNombre = localStorage.getItem('usuarioNombre');

  const pagar = () => {
    fetch('http://localhost:8080/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuarioId: localStorage.getItem('usuarioId'),
        cocheIds: carrito.map(c => c.id)
      })
    })
      .then(res => {
        if (res.ok) {
          alert('✅ Compra realizada correctamente');
          setCarrito([]);
          navigate('/');
        } else {
          alert('❌ Error al guardar el pedido');
        }
      })
      .catch(() => alert('❌ Error de conexión'));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">💳 Finalizar compra</h2>

      <p><strong>Comprador:</strong> {usuarioNombre}</p>

      <ul className="list-group mb-3">
        {carrito.map((coche, index) => (
          <li key={index} className="list-group-item">
            {coche.marca} {coche.modelo} - {coche.precio} €
          </li>
        ))}
      </ul>

      <p className="fw-bold">Total: {total} €</p>

      <form onSubmit={(e) => { e.preventDefault(); pagar(); }}>
        <input className="form-control mb-3" placeholder="Nombre en la tarjeta" required />
        <input className="form-control mb-3" placeholder="Número de tarjeta" required />
        <input className="form-control mb-3" placeholder="Fecha de expiración" required />
        <input className="form-control mb-3" placeholder="CVV" required />

        <button type="submit" className="btn btn-success w-100">Pagar ahora</button>
      </form>
    </div>
  );
}

export default Pago;
