import './filters.css';
import {
  FaHeart,
  FaMapMarkedAlt,
  FaRedditAlien,
  FaSpaceShuttle,
  FaTheaterMasks,
  FaVrCardboard,
} from 'react-icons/fa';
import { Category } from './Category';
import { ReactElement } from 'react';

const categories = [
  { id: 1, name: 'Fiction', icon: <FaSpaceShuttle /> },
  { id: 2, name: 'Science fiction', icon: <FaRedditAlien /> },
  { id: 3, name: 'Drama', icon: <FaTheaterMasks /> },
  { id: 4, name: 'Romance', icon: <FaHeart /> },
  { id: 5, name: 'Classic', icon: <FaVrCardboard /> },
  { id: 6, name: 'Adventure', icon: <FaMapMarkedAlt /> },
];

export function Filters(): ReactElement {
  return (
    <>
      <section className="filters-header">
        <h3>Book category</h3>
        <a href="#">
          <span>See all</span>
        </a>
      </section>
      <section className="filters-cards">
        {categories.map(({ id, name, icon }) => {
          return (
            <Category key={id} name={name}>
              {icon}
            </Category>
          );
        })}
      </section>
    </>
  );
}
