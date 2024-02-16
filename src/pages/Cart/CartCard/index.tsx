import './cartCard.css';
import { Product } from '../../../utils/interfaces/product';

export interface ICartCardProps {
  product: Product;
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
          <p className="product-price">{props.product.options[0].price} €</p>
        </section>
        <section className="product-actions"></section>
      </section>
    </article>
  );
}
