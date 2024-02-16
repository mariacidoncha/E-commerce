import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/layouts/ProtectedRoute';
import { Cart, Home, Login, Product, ProductDetail } from '../pages';
import { ProductContextProvider } from '../context/ProductContext';
import { FilterContextProvider } from '../context/FilterContext';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<ProductContextProvider />}>
          <Route element={<FilterContextProvider />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/:item" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Route>
      </Route>
      {/* <Route path='*' element={<div> 404 - not found </div>}/> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
