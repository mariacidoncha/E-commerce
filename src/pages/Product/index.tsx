import { Header } from '../../components/layouts/Header';
import { NavBar } from '../../components/layouts/NavBar';
import { ProductsSection } from '../../components/layouts/ProductsSection';

export interface IProductProps {}

export function Product(props: IProductProps) {
  return (
    <>
      <Header />
      <h2>Books section</h2>
      <ProductsSection />
      <NavBar />
    </>
  );
}
