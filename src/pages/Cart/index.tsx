import './cart.css';
import { NavBar } from '../../components/layouts/NavBar';
import { useAuthContext } from '../../context/AuthContext';
import { useProductContext } from '../../context/ProductContext';
import { CartCard } from './CartCard';
import { Product } from '../../utils/interfaces/product';
import { IoCartOutline } from 'react-icons/io5';

export function Cart() {
  const user = useAuthContext();
  const products = useProductContext();
  return (
    <>
      <section className="title-section">
        <IoCartOutline className="icon" />
        <h2>Cart</h2>
      </section>
      <section className="products-section">
        {user.user?.cart.map((userProduct) => {
          const cartProduct = products.products.find(
            (p) => parseInt(p.id) === userProduct.id
          ) as Product;
          return (
            <CartCard
              key={`${cartProduct?.id}p${userProduct.option}`}
              product={cartProduct}
              userOptions={userProduct}
            />
          );
        })}
      </section>
      <NavBar />
    </>
  );
}
