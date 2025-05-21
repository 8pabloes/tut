import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import DetalleCoche from './components/DetalleCoche';
import Cesta from './pages/Cesta';
import Pago from './pages/Pago';
import Login from './pages/Login';
import AdminCoches from './pages/AdminCoches';

import Registro from './pages/Registro';
import PagoStripe from './pages/PagoStripe';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './LogoTuT.png';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [usuarioNombre, setUsuarioNombre] = useState(localStorage.getItem('usuarioNombre'));

  useEffect(() => {
    const interval = setInterval(() => {
      setUsuarioNombre(localStorage.getItem('usuarioNombre'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
          toast.success('✅ Pedido realizado correctamente');
          setCarrito([]);
        } else {
          toast.error('❌ Error al guardar el pedido');
        }
      })
      .catch(() => toast.error('❌ Error de conexión'));
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioNombre');
    setUsuarioNombre(null);
    window.location.href = "/";
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AVwf850TUfIixcqAJdP7UuQEWJrwmtxo3ZXsivxvzPLIA6TAhDKQNZcoCYRVLpBp0oxy51OuWdOrZAth" }}>
      <Router>
        {/* ✅ Header */}
        <header className="bg-dark text-white py-3 mb-4 shadow-sm">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
              <h1 className="m-0">TUT - The Uxes Track 🏁</h1>
            </div>
            <div>
              {usuarioNombre ? (
                <>
                  <span className="me-3">👋 Hola, {usuarioNombre}</span>
                  <button onClick={cerrarSesion} className="btn btn-outline-light">Cerrar sesión</button>
                </>
              ) : (
                <Link to="/login" className="btn btn-outline-light">👤 Login</Link>
              )}
            </div>
          </div>
        </header>

        {/* ✅ Rutas */}
        <Routes>
          <Route path="/" element={<Home carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/detalle/:id" element={<DetalleCoche />} />
          <Route path="/cesta" element={<Cesta carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/pago" element={<Pago carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/login" element={<Login setUsuarioNombre={setUsuarioNombre} />} />
          <Route path="/registro" element={<Registro setUsuarioNombre={setUsuarioNombre} />} />
          <Route path="/stripe" element={<PagoStripe />} />
          <Route path="/admin" element={<AdminCoches />} />

        </Routes>

<ToastContainer
  position="top-center"
  autoClose={2000}
  hideProgressBar
  pauseOnHover={false}
  closeOnClick
  draggable={false}
/>

      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
