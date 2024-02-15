import { ReactNode, useState } from 'react';
import { Header } from '../../components/layouts/Header';
import { NavBar } from '../../components/layouts/NavBar';
import { ProductsSection } from '../../components/layouts/ProductsSection';

export function Product(): ReactNode {
  const [filter, setFilter] = useState('');

  return (
    <>
      <Header filter={filter} setFilter={setFilter} />
      <h2>Books section</h2>
      <ProductsSection filter={filter} />
      <NavBar />
    </>
  );
}
