import './cart.css';
import { NavBar } from '../../components/layouts/NavBar';
import { useAuthContext } from '../../context/AuthContext';
import { useProductContext } from '../../context/ProductContext';
import { CartCard } from './CartCard';
import { Product } from '../../utils/interfaces/product';
import { IoCartOutline, IoSadOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Button } from '../../components/common/button';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';

export function Cart() {
  const user = useAuthContext();
  const products = useProductContext();
  const [totalCostValue, setTotalCostValue] = useState('');
  const navigate = useNavigate();

  function totalCost() {
    let total = 0;
    user.user?.cart.forEach((el) => {
      total += el.option * el.quantity;
    });

    setTotalCostValue(total.toFixed(2));
  }

  useEffect(() => {
    totalCost();
  }, []);

  function handleClick() {
    navigate(-1);
  }

  function handleCLickCheckOut() {
    navigate('/checkout');
  }

  return (
    <>
      <BsArrowLeftCircle onClick={handleClick} className="back" />
      <section className="title-section">
        <IoCartOutline className="icon" />
        <h2>Shopping cart</h2>
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
              render={totalCost}
            />
          );
        })}
      </section>
      {user.user?.cart.length! > 0 && (
        <section className="cart-resume">
          <ul>
            {user.user?.cart.map((el) => {
              const name = products.products.find((e) => {
                return e.id === el.id.toString();
              })?.name;
              return (
                <li key={`${el.id}p${el.option}`}>
                  <p>{name}:</p> <p>{el.option * el.quantity} €</p>
                </li>
              );
            })}
          </ul>
          <hr />
          <li className="total-li">
            <p>TOTAL:</p> <p>{totalCostValue} €</p>
          </li>
          <Button handle={handleCLickCheckOut}>Check out</Button>
        </section>
      )}
      <NavBar />
    </>
  );
}
