import './home.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filters } from './Filters';
import { Header } from '../../components/layouts/Header';
import { NavBar } from '../../components/layouts/NavBar';
import { ProductsSection } from '../../components/layouts/ProductsSection';
import { useProductContext } from '../../components/layouts/ProductContext';
import { getProducts } from '../../utils';

export function Home() {
  const products = useProductContext();

  useEffect(() => {
    async function getProductAPI() {
      const response = await getProducts();
      products.setProducts(response);
    }

    getProductAPI();
  }, []);

  return (
    <>
      <Header />
      <Filters />
      <section className="popular-header">
        <h3>Most popular</h3>
        <Link to="/products">
          <span>See all</span>
        </Link>
      </section>
      <ProductsSection max={5} />
      <NavBar />
    </>
  );
}
