import './productDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import { NavBar } from '../../components/layouts/NavBar';
import { CartModal } from '../../components/layouts/CartModal';
import { Product } from '../../utils/interfaces/product';
import { FaStar } from 'react-icons/fa';
import { BsArrowLeftCircle, BsCheck2Circle } from 'react-icons/bs';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

export function ProductDetail() {
  const products = useProductContext();
  const navigate = useNavigate();
  const { item } = useParams();
  const showProduct = products.products.find((p) => p.id === item) as Product;
  useEffect(() => {
    console.log(showProduct, item);
  }, [item]);
  // const [option, setOption] = useState(0);
  const [price, setPrice] = useState(showProduct.options[0].price);
  // const [price, setPrice] = useState(`${showProduct.options[0].price} €`);
  const rate = Math.floor(showProduct!.rate);
  const stars = Array.from({ length: rate }, (_e, i) => (
    <FaStar fill="#F7BC13" key={i} />
  ));

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPrice(
      parseFloat(e.target.nextSibling?.lastChild?.textContent as string)
    );
    // setOption(e.itemID);
  }

  function handleClick() {
    navigate('/home');
  }

  const userOptions = useMemo(() => ({ price, quantity: 1 }), [price]);

  return (
    <>
      <section className="book-detail-section">
        <BsArrowLeftCircle onClick={handleClick} className="back" />
        <h2>{showProduct.name}</h2>
        <h4>{showProduct.author.name}</h4>
        <img
          className="book-img"
          src={showProduct.image}
          alt={`${showProduct.name} image`}
        />
        <span className="book-rating">
          {stars.map((s) => s)} <span> ({showProduct.rate})</span>
        </span>
        {/* <p className="book-price">{showProduct.options[option].price}</p> */}
        <p className="book-price">{price} €</p>
        <section className="btn-section">
          {showProduct.options.map((option, i) => {
            const checked = i === 0 ? true : false;
            return (
              <label className="label-btn" key={option.cover}>
                <input
                  defaultChecked={checked}
                  onChange={handleChange}
                  className="radio-btn"
                  name="option-btn"
                  type="radio"
                />
                <section className="option-btn">
                  <BsCheck2Circle className="check-btn" />
                  <p>{option.cover}</p>
                  <p>{option.price} €</p>
                </section>
              </label>
            );
          })}
        </section>

        <ul className="genre-list">
          {showProduct.genre.map((g, i) => (
            <li className="genre-item" key={i}>
              {g}
            </li>
          ))}
        </ul>

        <h2>Synopsis</h2>
        <p className="book-synopsis">{showProduct.synopsis}</p>
      </section>
      <section className="author-detail-section">
        <h2>{showProduct.author.name}</h2>
        <img
          className="author-img"
          src={showProduct.author.image}
          alt={`${showProduct.author.name} image`}
        />
        <p className="book-synopsis">{showProduct.author.description}</p>
      </section>
      {/* <CartModal
        price={showProduct.options[option].price.toString()}
        idProduct={showProduct.id}
      /> */}
      <CartModal userOptions={userOptions} idProduct={showProduct.id} />
      <NavBar />
    </>
  );
}
