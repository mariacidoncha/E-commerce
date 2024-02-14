import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { ProtectedRoute } from './components/layouts/ProtectedRoute';
import { AuthContextProvider } from './components/layouts/AuthContext';

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthContextProvider />}>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Route>
        {/* <Route path='*' element={<div> 404 - not found </div>}/> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
