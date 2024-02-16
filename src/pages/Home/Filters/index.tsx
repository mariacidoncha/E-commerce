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
import { ReactElement, MouseEvent } from 'react';
import { useFilterContext } from '../../../context/FilterContext';
import { FilterType } from '../../../utils/interfaces/product';

const categories = [
  { id: 1, name: 'Fiction', icon: <FaSpaceShuttle /> },
  { id: 2, name: 'Science fiction', icon: <FaRedditAlien /> },
  { id: 3, name: 'Drama', icon: <FaTheaterMasks /> },
  { id: 4, name: 'Romance', icon: <FaHeart /> },
  { id: 5, name: 'Classic', icon: <FaVrCardboard /> },
  { id: 6, name: 'Adventure', icon: <FaMapMarkedAlt /> },
];

export function Filters(): ReactElement {
  const filter = useFilterContext();

  function remove() {
    filter.setFilter({ type: FilterType.name, param: '' });
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>): void {
    const target = e.currentTarget as HTMLButtonElement;
    filter.setFilter({ type: FilterType.category, param: target.id });
  }

  return (
    <>
      <section className="filters-header">
        <h3>Book category</h3>
        <a href="#">
          <button onClick={remove} className="category-btn">
            <span>Remove filters</span>
          </button>
        </a>
      </section>
      <section className="filters-cards">
        {categories.map(({ id, name, icon }) => {
          return (
            <button
              onClick={handleClick}
              key={id}
              id={name}
              className="category-btn"
            >
              <Category name={name}>{icon}</Category>
            </button>
          );
        })}
      </section>
    </>
  );
}
