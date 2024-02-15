import './home.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Filters } from './Filters';
import { Header } from '../../components/layouts/Header';
import { NavBar } from '../../components/layouts/NavBar';
import { ProductsSection } from '../../components/layouts/ProductsSection';
import { useProductContext } from '../../contexts/ProductContext';
import { getProducts } from '../../utils';

export function Home() {
  const products = useProductContext();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function getProductAPI() {
      const response = await getProducts();
      products.setProducts(response);
    }

    getProductAPI();
  }, []);

  return (
    <>
      <Header filter={filter} setFilter={setFilter} />
      <Filters />
      <section className="popular-header">
        <h3>Most popular</h3>
        <Link to="/products">
          <span>See all</span>
        </Link>
      </section>
      <ProductsSection max={5} filter={filter} />
      <NavBar />
    </>
  );
}
