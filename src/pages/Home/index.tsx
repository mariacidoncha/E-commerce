import './home.css';
import { Link } from 'react-router-dom';
import { Filters } from './Filters';
import { Header } from '../../components/layouts/Header';
import { NavBar } from '../../components/layouts/NavBar';
import { ProductsSection } from '../../components/layouts/ProductsSection';

export function Home() {
  return (
    <>
      <Header search />
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
