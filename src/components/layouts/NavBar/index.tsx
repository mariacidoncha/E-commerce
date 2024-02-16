import { ReactNode } from 'react';
import './navBar.css';
import {
  IoHomeOutline,
  IoCartOutline,
  IoHeartOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

export function NavBar(): ReactNode {
  return (
    <section className="nav">
      <NavLink to="/home">
        <IoHomeOutline stroke="#EEEED0" />
        <p className="description">Home</p>
      </NavLink>
      <NavLink to="/cart">
        <IoCartOutline stroke="#EEEED0" />
        <p className="description">Cart</p>
      </NavLink>
      <IoHeartOutline stroke="#EEEED0" />
      <IoPersonOutline stroke="#EEEED0" />
    </section>
  );
}
