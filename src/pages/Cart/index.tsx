import './cart.css';
import { NavBar } from '../../components/layouts/NavBar';
import { useAuthContext } from '../../context/AuthContext';
import { useProductContext } from '../../context/ProductContext';
import { CartCard } from './CartCard';
import { Product } from '../../utils/interfaces/product';
import { IoCartOutline, IoSadOutline } from 'react-icons/io5';

export function Cart() {
  const user = useAuthContext();
  const products = useProductContext();

  function totalCost() {
    let total = 0;
    user.user?.cart.forEach((el) => {
      total += el.option * el.quantity;
    });

    return total.toFixed(2);
  }

  return (
    <>
      <section className="title-section">
        <IoCartOutline className="icon" />
        <h2>Cart</h2>
      </section>
      <section className="products-section">
        {user.user?.cart.length === 0 && (
          <>
            <IoSadOutline className="cart-icon" />
            <h3>You don't have books added to cart yet.</h3>
          </>
        )}
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
      <section className="cart-resume">
        <ul>
          {user.user?.cart.map((el) => {
            const name = products.products.find((e) => {
              return e.id === el.id.toString();
            })?.name;
            return (
              <li key={el.id}>
                <p>{name}:</p> <p>{el.option * el.quantity} €</p>
              </li>
            );
          })}
        </ul>
        <hr />
        <li className="total-li">
          <p>TOTAL:</p> <p>{totalCost()} €</p>
        </li>
      </section>
      <NavBar />
    </>
  );
}
