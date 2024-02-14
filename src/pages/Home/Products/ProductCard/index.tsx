import './productCard.css';
import { FaRegHeart, FaPlus, FaStar } from 'react-icons/fa';

export interface IProductCardProps {
  name: string;
  image: string;
  author: string;
  price: number;
  rating: number;
}

export function ProductCard(props: IProductCardProps) {
  const rate = Math.floor(props.rating);
  const stars = Array.from({ length: rate }, (_e, i) => (
    <FaStar fill="#F7BC13" key={i} />
  ));

  return (
    <article className="card">
      <section className="card-header">
        <img
          className="card-img"
          src={props.image}
          alt={`${props.name} image`}
        />
        <section className="card-icons">
          <FaRegHeart fill="#E74800" />
          <FaPlus />
        </section>
      </section>
      <section className="card-info">
        <h3>{props.name}</h3>
        <p>{props.author}</p>
        <span>
          {props.price}
          <span className="card-euro">€</span>
        </span>
        <section className="card-rating">
          {stars.map((s) => s)}
          <span>({props.rating})</span>
        </section>
      </section>
    </article>
  );
}
