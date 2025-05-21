
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm({ carrito, setCarrito }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (error) {
      alert(error.message);
    } else {
      alert('✅ Pago simulado con tarjeta (Stripe)');
      setCarrito([]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="form-control mb-3 p-2 border" />
      <button className="btn btn-success w-100" type="submit" disabled={!stripe}>
        Pagar con tarjeta
      </button>
    </form>
  );
}

export default CheckoutForm;
