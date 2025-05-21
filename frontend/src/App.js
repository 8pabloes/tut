import Home from './pages/Home';
import DetalleCoche from './components/DetalleCoche';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pedidos from './pages/Pedidos';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle/:id" element={<DetalleCoche />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </Router>
  );
}

export default App;
