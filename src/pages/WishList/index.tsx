import './wishList.css';
import { NavBar } from '../../components/layouts/NavBar';
import { useAuthContext } from '../../context/AuthContext';
import { useProductContext } from '../../context/ProductContext';
import { WishListCard } from './WishListCard';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

export interface IWishListProps {}

export function WishList(props: IWishListProps) {
  const user = useAuthContext();
  const products = useProductContext();
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <>
      <BsArrowLeftCircle onClick={handleClick} className="back" />
      <section className="title-section">
        <FaHeart className="icon" />
        <h2>Wishlist</h2>
      </section>
      <section className="wishlist-section">
        {user.user?.wishlist.map((w) => {
          const product = products.products.find((p) => p.id === w.toString())!;
          return (
            <Link key={product.id} to={`/${product.id}`}>
              <WishListCard
                author={product.author.name}
                image={product.image}
                name={product.name}
              ></WishListCard>
            </Link>
          );
        })}
      </section>
      <NavBar />
    </>
  );
}
