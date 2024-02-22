import './checkout.css';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/layouts/NavBar';
import { useAuthContext } from '../../context/AuthContext';
import { useProductContext } from '../../context/ProductContext';
import { ChangeEvent, useEffect, useState } from 'react';

export interface ICheckoutProps {}

export function Checkout() {
  const navigate = useNavigate();
  const user = useAuthContext();
  const products = useProductContext();
  const productsPrice =
    user.user?.cart.reduce(
      (total, value) => total + value.option * value.quantity,
      0
    ) ?? 0;
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(10.5);
  const [total, setTotal] = useState(0);

  function totalCost() {
    let total = productsPrice - discount + shipping;

    setTotal(parseFloat(total.toFixed(2)));
  }

  useEffect(() => {
    totalCost();
  }, [shipping]);

  function handleClick() {
    navigate(-1);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setShipping(parseFloat(e.target.id));
  }

  return (
    <>
      <BsArrowLeftCircle onClick={handleClick} className="back" />
      <section className="title-section">
        <IoCartOutline className="icon" />
        <h2>Cart check out</h2>
      </section>
      <section className="accordion-checkout">
        <details className="details-checkout" name="checkout" open>
          <summary>Resume</summary>
          <ul>
            {user.user?.cart.map((e) => {
              const product = products.products.find((el) => {
                return e.id.toString() === el.id;
              });
              return (
                <li key={`${e.id}p${e.option}`}>
                  <img src={product?.image} alt={`${product?.name} cover`} />
                  <section className="product-details">
                    <p>{product?.name}</p>
                    <p>{e.quantity} items</p>
                    <p>{e.option * e.quantity} €</p>
                  </section>
                </li>
              );
            })}
          </ul>
        </details>
        <details className="details-checkout" name="checkout">
          <summary>Shipping</summary>
          <ul>
            <li>
              <label>
                <input
                  id="10.5"
                  onChange={handleChange}
                  name="shipping"
                  type="radio"
                  defaultChecked
                />
                Fast delivery
              </label>
            </li>
            <li>
              <label>
                <input
                  id="2.3"
                  onChange={handleChange}
                  name="shipping"
                  type="radio"
                />
                Normal delivery
              </label>
            </li>
            <li>
              <label>
                <input
                  id="0"
                  onChange={handleChange}
                  name="shipping"
                  type="radio"
                />
                Pick up delivery
              </label>
            </li>
          </ul>
        </details>
        <details className="details-checkout" name="checkout">
          <summary>Payment</summary>
        </details>
      </section>
      <section className="cart-resume">
        <ul>
          <li>
            <p>Products price:</p> <p>{productsPrice?.toFixed(2)} €</p>
          </li>
          <li>
            <p>Discount:</p> <p className="price-discount">{discount} €</p>
          </li>
          <li>
            <p>Shipping price:</p> <p>{shipping} €</p>
          </li>
        </ul>
        <hr />
        <li className="total-li">
          <p>TOTAL:</p> <p>{total.toFixed(2)} €</p>
        </li>
      </section>
      <NavBar />
    </>
  );
}
