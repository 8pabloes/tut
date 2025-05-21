import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';

function Pago({ carrito, setCarrito }) {
  const navigate = useNavigate();
  const total = carrito.reduce((sum, coche) => sum + coche.precio, 0);
  const usuarioNombre = localStorage.getItem('usuarioNombre');

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

      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: total.toString()
              }
            }]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(() => {
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
                  alert('✅ Pago confirmado y pedido guardado');
                  setCarrito([]);
                  navigate('/');
                } else {
                  alert('❌ Error al guardar el pedido');
                }
              })
              .catch(() => alert('❌ Error de conexión al guardar'));
          });
        }}
      />
    </div>
  );
}

export default Pago;
