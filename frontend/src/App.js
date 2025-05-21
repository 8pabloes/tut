import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetalleCoche from './components/DetalleCoche';
import Cesta from './pages/Cesta';
import Pago from './pages/Pago';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Login from './pages/Login';
import Registro from './pages/Registro';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const [carrito, setCarrito] = useState([]);

  const finalizarCompra = () => {
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
          alert('✅ Pedido realizado');
          setCarrito([]);
        } else {
          alert('❌ Error al guardar el pedido');
        }
      })
      .catch(() => alert('❌ Error de conexión'));
  };

return (
    <PayPalScriptProvider options={{ "client-id": "AVwf850TUfIixcqAJdP7UuQEWJrwmtxo3ZXsivxvzPLIA6TAhDKQNZcoCYRVLpBp0oxy51OuWdOrZAth" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/detalle/:id" element={<DetalleCoche />} />
          <Route path="/cesta" element={<Cesta carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/pago" element={<Pago carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
