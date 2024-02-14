import './home.css';
import { Filters } from './Filters';
import { Header } from '../../components/layouts/Header';
import { NavBar } from '../../components/layouts/NavBar';
import { ProductsSection } from '../../components/layouts/ProductsSection';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <>
      <NavBar />
      <Header />
      <Filters />
      <section className="popular-header">
        <h3>Most popular</h3>
        <Link to="/products">See all</Link>
      </section>
      <ProductsSection max={5} />
    </>
  );
}
