import './checkout.css';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/layouts/NavBar';
import { useAuthContext } from '../../context/AuthContext';
import { useProductContext } from '../../context/ProductContext';
import { ChangeEvent, useEffect, useState } from 'react';
import { discounts } from '../../assets/data/discounts';
import toast, { Toaster } from 'react-hot-toast';

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
  const [discountInput, setDiscountInput] = useState('');
  const [shipping, setShipping] = useState(10.5);
  const [total, setTotal] = useState(0);
  const [paymentClass, setPaymentClass] = useState('add-card hide');
  const [errorClass, setErrorClass] = useState('hide');

  function totalCost() {
    let total = productsPrice + discount + shipping;

    setTotal(parseFloat(total.toFixed(2)));
  }

  useEffect(() => {
    totalCost();
  }, [shipping, discount]);

  function handleClick() {
    navigate(-1);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setShipping(parseFloat(e.target.id));
  }

  function handleChangeCard(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setPaymentClass('add-card');
    } else {
      setPaymentClass('add-card hide');
    }
  }

  function handleClickCoupon() {
    const discountFound = discounts.find((d) => {
      return d.name === discountInput;
    });
    if (discountFound) {
      setErrorClass('hide');
      setDiscount(
        -parseFloat((productsPrice * discountFound.value).toFixed(2))
      );
      toast.success('Successfully toasted!', {
        style: {
          fontSize: '1.5rem',
        },
      });
    } else {
      setErrorClass('');
      setDiscount(0);
      toast.error('Invalid coupon', {
        style: {
          fontSize: '1.5rem',
        },
      });
    }
  }

  function handleChangeDiscountValue(e: ChangeEvent<HTMLInputElement>) {
    setDiscountInput(e.target.value);
  }

  return (
    <>
      <Toaster />
      <BsArrowLeftCircle onClick={handleClick} className="back" />
      <section className="title-section">
        <IoCartOutline className="icon" />
        <h2>Cart check out</h2>
      </section>
      <section className="accordion-checkout">
        <details name="checkout" open>
          <summary>Resume</summary>
          <ul>
            {user.user?.cart.map((e) => {
              const product = products.products.find((el) => {
                return e.id.toString() === el.id;
              });
              const coverOption = product?.options.find((o) => {
                return o.price === e.option;
              })?.cover;
              return (
                <li key={`${e.id}p${e.option}`}>
                  <img src={product?.image} alt={`${product?.name} cover`} />
                  <section className="product-details">
                    <p>
                      {product?.name}{' '}
                      <span className="book-option">({coverOption})</span>
                    </p>
                    <p>{e.quantity} items</p>
                    <p>{e.option * e.quantity} €</p>
                  </section>
                </li>
              );
            })}
          </ul>
        </details>
        <details name="checkout">
          <summary>Shipping</summary>
          <ul>
            <li>
              <label className="card-section-label">
                <input
                  id="10.5"
                  onChange={handleChange}
                  className="add-card-input"
                  name="shipping"
                  type="radio"
                  defaultChecked
                />
                Fast delivery (10.50 €)
              </label>
            </li>
            <li>
              <label className="card-section-label">
                <input
                  id="2.3"
                  onChange={handleChange}
                  className="add-card-input"
                  name="shipping"
                  type="radio"
                />
                Normal delivery (2.30 €)
              </label>
            </li>
            <li>
              <label className="card-section-label">
                <input
                  id="0"
                  onChange={handleChange}
                  className="add-card-input"
                  name="shipping"
                  type="radio"
                />
                Pick up delivery (FREE)
              </label>
            </li>
          </ul>
        </details>
        <details name="checkout">
          <summary>Payment</summary>
          <section className="card-section">
            <label className="card-section-label">
              <input
                className="add-card-input"
                onChange={handleChangeCard}
                type="checkbox"
              />
              <img src="public/mastercard-svgrepo-com.svg" alt="" />
              Add MasterCard
            </label>
            <section className={paymentClass}>
              <label className="card-number">
                Card number:
                <input type="number" />
              </label>
              <label className="card-expiry">
                Expiry:
                <input type="month" />
              </label>
              <label className="card-code">
                Card code:
                <input type="number" placeholder="CVC" />
              </label>
            </section>
            <label className="card-section-label">
              <input className="add-card-input" type="checkbox" />
              <img src="public/paypal-svgrepo-com.svg" alt="" />
              PayPal
            </label>
            <label className="card-section-label">
              <img src="public/label-tag-price-svgrepo-com.svg" alt="" />
              Add a coupon:
              <input
                type="text"
                value={discountInput}
                onChange={handleChangeDiscountValue}
              />
              <small className={errorClass}>Invalid coupon</small>
              <button onClick={handleClickCoupon} className="coupon-btn">
                Apply
              </button>
            </label>
          </section>
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
