import './productCard.css';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaPlus, FaStar } from 'react-icons/fa';
import { Button } from '../../../common/button';
import { ReactNode } from 'react';
import { useAuthContext } from '../../../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export interface IProductCardProps {
  id: string;
  name: string;
  image: string;
  author: string;
  price: number;
  rating: number;
}

export function ProductCard(props: IProductCardProps): ReactNode {
  const user = useAuthContext();
  const rate = Math.floor(props.rating);
  const stars = Array.from({ length: rate }, (_e, i) => (
    <FaStar fill="#F7BC13" key={i} />
  ));

  function handleClickAdd() {
    const added = user.user?.cart.find((e) => {
      return e.id.toString() === props.id && e.option === props.price;
    });

    if (!added) {
      user.user?.cart.push({
        id: parseInt(props.id),
        quantity: 1,
        option: props.price,
      });
      toast.success('Successfully added!', {
        icon: '👏',
        style: {
          fontSize: '1.5rem',
        },
      });
    } else {
      toast.success('Successfully added!', {
        icon: '👏',
        style: {
          fontSize: '1.5rem',
        },
      });
      added.quantity = added.quantity + 1;
    }
  }

  return (
    <article className="card">
      <section className="card-icons">
        <FaRegHeart fill="#E74800" />
        <FaPlus onClick={handleClickAdd} />
      </section>
      <Link to={`/${props.id}`}>
        <Toaster />
        <section className="card-header">
          <img
            className="card-img"
            src={props.image}
            alt={`${props.name} image`}
          />
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
      </Link>
    </article>
  );
}
