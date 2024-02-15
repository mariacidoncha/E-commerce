import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from '../contexts/AuthContext';
import { ProductContextProvider } from '../contexts/ProductContext';
import { ProtectedRoute } from '../components/layouts/ProtectedRoute';
import { Cart, Home, Login, Product, ProductDetail } from '../pages';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthContextProvider />}>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<ProductContextProvider />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:item" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Route>
      </Route>
      {/* <Route path='*' element={<div> 404 - not found </div>}/> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
