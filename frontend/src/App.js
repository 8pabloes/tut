import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetalleCoche from './components/DetalleCoche';
import Cesta from './pages/Cesta';
import Pago from './pages/Pago';

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
    <Router>
      <Routes>
        <Route path="/" element={<Home carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/detalle/:id" element={<DetalleCoche />} />
        
<Route path="/pago" element={<Pago carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/cesta" element={<Cesta carrito={carrito} finalizarCompra={finalizarCompra} />} />
      </Routes>
    </Router>
  );
}

export default App;
