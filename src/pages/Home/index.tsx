import './home.css';
import { Filters } from './Filters';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Products } from './Products';

export interface IHomeProps {}

export function Home(props: IHomeProps) {
  return (
    <>
      <NavBar />
      <Header />
      <Filters />
      <Products />
    </>
  );
}
