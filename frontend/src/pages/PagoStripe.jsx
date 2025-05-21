// src/pages/PagoStripe.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('TU_CLAVE_PUBLICA_STRIPE_AQUÍ');

function PagoStripe({ carrito, setCarrito }) {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">💳 Pagar con tarjeta</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm carrito={carrito} setCarrito={setCarrito} />
      </Elements>
    </div>
  );
}

export default PagoStripe;
