import './navBar.css';
import { IoHomeOutline, IoCartOutline } from 'react-icons/io5';
import { FaRegHeart, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export interface INavBarProps {}

export function NavBar(props: INavBarProps) {
  return (
    <section className="nav">
      <Link to="/home">
        <IoHomeOutline stroke="#EEEED0" />
      </Link>
      <Link to="/cart">
        <IoCartOutline stroke="#EEEED0" />
      </Link>
      <FaRegHeart fill="#EEEED0" />
      <FaRegUser fill="#EEEED0" />
    </section>
  );
}
