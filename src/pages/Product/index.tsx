import { ReactNode } from 'react';
import { Header } from '../../components/layouts/Header';
import { NavBar } from '../../components/layouts/NavBar';
import { ProductsSection } from '../../components/layouts/ProductsSection';

export function Product(): ReactNode {
  return (
    <>
      <Header search />
      <h2>Books section</h2>
      <ProductsSection />
      <NavBar />
    </>
  );
}
