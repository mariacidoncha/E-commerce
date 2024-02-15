import './productCard.css';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaPlus, FaStar } from 'react-icons/fa';
import { Button } from '../../../common/button';

export interface IProductCardProps {
  id: string;
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
    <Link to={`/products/${props.id}`}>
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
          <p>
            {props.price}
            <span className="card-euro"> €</span>
          </p>
          <section className="card-rating">
            {stars.map((s) => s)}
            <span>({props.rating})</span>
          </section>
        </section>
        <Button size={'1rem'}>More info</Button>
      </article>
    </Link>
  );
}
