import './cartCard.css';
import { Product } from '../../../utils/interfaces/product';
import { IoHeartOutline, IoTrashOutline } from 'react-icons/io5';
import { ProductCart } from '../../../utils/interfaces/user';

export interface ICartCardProps {
  product: Product;
  userOptions: ProductCart;
}

export function CartCard(props: ICartCardProps) {
  return (
    <article className="cart-card">
      <img src={props.product.image} alt={`${props.product.name} image`} />
      <section className="product-info">
        <p className="product-name">{props.product.name}</p>
        <p>{props.product.author.name}</p>
        <section className="product-option">
          <p className="product-cover">{props.product.options[0].cover}</p>
          <p className="primary-color">{props.product.options[0].price} €</p>
        </section>
        <section className="product-actions">
          <IoHeartOutline className="icon" />
          <IoTrashOutline className="icon primary-color" />
          <span>
            <button>-</button>
            {props.userOptions.quantity}
            <button>+</button>
          </span>
        </section>
      </section>
    </article>
  );
}
