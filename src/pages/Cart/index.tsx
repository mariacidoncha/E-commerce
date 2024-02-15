import { NavBar } from '../../components/layouts/NavBar';

export interface ICartProps {}

export function Cart(props: ICartProps) {
  return (
    <>
      <p>Cart page</p>
      <NavBar />
    </>
  );
}
